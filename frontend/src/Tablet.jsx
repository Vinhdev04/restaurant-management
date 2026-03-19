import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Tablet({ socket }) {
  const [activeTableId, setActiveTableId] = useState(null); 
  const [menuItems, setMenuItems] = useState([]); 
  const [cart, setCart] = useState([]); 
  const [myTrackingOrders, setMyTrackingOrders] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchMon, setSearchMon] = useState(''); 
  
  const [showPaymentSelection, setShowPaymentSelection] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false); 
  
  const [isLocked, setIsLocked] = useState(true); 
  const [pinInput, setPinInput] = useState('');

  const fetchMenu = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/menu/all`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setMenuItems(data);
        } else {
          console.error("Dữ liệu menu không phải là mảng:", data);
          setMenuItems([]);
        }
      } else {
        console.error("Lỗi tải menu:", res.status);
        setMenuItems([]);
      }
    } catch (error) {
      console.error("Lỗi kết nối khi tải menu:", error);
      setMenuItems([]);
    }
  };

  useEffect(() => { fetchMenu(); }, []);

  useEffect(() => {
    if (!activeTableId) return;

    const fetchOldOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/customer/${activeTableId}`);
        if (res.ok) setMyTrackingOrders(await res.json());
      } catch (error) {}
    };

    fetchOldOrders(); 

    socket.on('NEW_ORDER_RECEIVED', (newOrder) => {
      if (newOrder.tableId === activeTableId) setMyTrackingOrders(prev => [newOrder, ...prev]);
    });

    socket.on('ITEM_COMPLETED', ({ orderId, itemId, status }) => {
      setMyTrackingOrders(prev => prev.map(order => {
        if (order._id === orderId) {
          const newItems = order.items.map(item => item._id === itemId ? { ...item, status: status } : item);
          return { ...order, items: newItems };
        }
        return order;
      }));
    });

    socket.on('PAYMENT_CONFIRMED', ({ tableId: paidTableId }) => {
      if (paidTableId === activeTableId) {
        setPaymentSuccess(true); 
        setTimeout(() => {
          setMyTrackingOrders([]);
          setSelectedBill(null);
          setPaymentSuccess(false);
          setActiveTableId(null); 
          setIsLocked(true);      
        }, 4000);
      }
    });
    
    socket.on('MENU_UPDATED', () => fetchMenu());

    return () => {
      socket.off('NEW_ORDER_RECEIVED');
      socket.off('ITEM_COMPLETED');
      socket.off('PAYMENT_CONFIRMED');
      socket.off('MENU_UPDATED');
    };
  }, [socket, activeTableId]);

  const handleUnlock = async () => {
    if (!pinInput) return alert("Vui lòng nhập mã PIN!");
    try {
      const res = await fetch(`${API_URL}/customer/verify-pin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinInput }) 
      });
      const data = await res.json();
      if (res.ok) {
        setActiveTableId(data.tableId); 
        setIsLocked(false);
        setPinInput(''); 
      } else { alert(data.message); }
    } catch (error) { alert("Lỗi kết nối kiểm tra mã PIN!"); }
  };

  const categories = ['Tất cả', ...Array.from(new Set(menuItems.map(m => m.category).filter(Boolean)))];
  
  const filteredMenuItems = menuItems.filter(mon => {
    const matchCategory = selectedCategory === 'Tất cả' || mon.category === selectedCategory;
    const matchSearch = mon.name.toLowerCase().includes(searchMon.toLowerCase());
    return matchCategory && matchSearch;
  });

  const addToCart = (mon) => {
    if (!mon.isAvailable) return; 
    const existItemIndex = cart.findIndex(item => item.menuItemId === mon.name);
    if (existItemIndex !== -1) {
      const newCart = [...cart];
      newCart[existItemIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { menuItemId: mon.name, price: mon.price, quantity: 1, note: '' }]);
    }
  };

  const updateQuantity = (monName, newQty) => {
    if (newQty === '') {
      setCart(cart.map(item => item.menuItemId === monName ? { ...item, quantity: '' } : item));
      return;
    }
    const val = parseInt(newQty);
    if (!isNaN(val) && val >= 1) {
      setCart(cart.map(item => item.menuItemId === monName ? { ...item, quantity: val } : item));
    }
  };

  const removeFromCart = (menuItemId) => {
    setCart(cart.filter(item => item.menuItemId !== menuItemId));
  };

  const updateNote = (monName, noteValue) => {
    const newCart = cart.map(item => item.menuItemId === monName ? { ...item, note: noteValue } : item);
    setCart(newCart);
  };

  const handleOrder = async () => {
    const validCart = cart.map(item => ({ ...item, quantity: parseInt(item.quantity) || 1 }));
    if (validCart.length === 0) return alert("Vui lòng chọn ít nhất 1 món ăn!");
    try {
      const res = await fetch(`${API_URL}/customer/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableId: activeTableId, items: validCart }) 
      });
      if (res.ok) setCart([]); 
    } catch (error) { alert("Lỗi kết nối!"); }
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * (parseInt(item.quantity) || 0)), 0);
  const openOrders = myTrackingOrders; 
  const hasOpenOrders = openOrders.length > 0;
  const allItemsCompleted = hasOpenOrders && openOrders.every(order => order.items.every(item => item.status === 'Hoàn thành' || item.status === 'Hết món'));
  const canRequestPayment = hasOpenOrders && allItemsCompleted;

  const submitPaymentRequest = async (method) => {
    try {
      const res = await fetch(`${API_URL}/customer/request-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableId: activeTableId, paymentMethod: method })
      });
      if (res.ok) {
        setShowPaymentSelection(false); 
        setSelectedBill(await res.json()); 
      } else {
        const data = await res.json();
        alert(data.message || "Không gửi được yêu cầu thanh toán.");
      }
    } catch (error) { alert("Lỗi kết nối khi yêu cầu thanh toán!"); }
  };

  const isWaitingPayment = myTrackingOrders.some(o => o.paymentStatus === 'Chờ thanh toán');
  const showBillOverlay = selectedBill || isWaitingPayment || paymentSuccess;

  let displayBill = selectedBill;
  if (!displayBill && isWaitingPayment) {
    displayBill = {
      tableId: activeTableId,
      totalAmount: myTrackingOrders.reduce((sum, order) => sum + order.items.reduce((s, item) => item.status !== 'Hết món' ? s + (item.price * item.quantity) : s, 0), 0),
      orders: myTrackingOrders
    };
  }

  const currentPaymentMethod = displayBill?.orders?.[0]?.paymentMethod || 'CASH';

  // Cấu hình QR Code
  const BANK_ID = "TPB"; 
  const ACCOUNT_NO = "00000594089"; 
  const ACCOUNT_NAME = "DANG XUAN TOAN"; 
  
  let qrUrl = "";
  if (displayBill && currentPaymentMethod === 'BANK_TRANSFER') {
    const amount = displayBill.totalAmount;
    const addInfo = `ThanhToan${displayBill.tableId.replace(/ /g, '')}`; 
    qrUrl = `https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-compact2.png?amount=${amount}&addInfo=${addInfo}&accountName=${ACCOUNT_NAME}`;
  }

  if (isLocked) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#34495e', color: 'white' }}>
        <h1 style={{ fontSize: '40px' }}>CHÀO MỪNG QUÝ KHÁCH</h1>
        <p style={{ fontSize: '18px', marginBottom: '30px' }}>Vui lòng nhập mã PIN do nhân viên cung cấp để gọi món</p>
        <div style={{ display: 'flex', gap: '15px' }}>
          <input type="text" placeholder="Mã PIN 6 số..." maxLength={6} value={pinInput} onChange={(e) => setPinInput(e.target.value)} style={{ padding: '15px', fontSize: '20px', textAlign: 'center', borderRadius: '8px', border: 'none', width: '250px' }} />
          <button onClick={handleUnlock} style={{ padding: '15px 30px', fontSize: '18px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>MỞ BÀN</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial', overflow: 'hidden' }}>
      
      {/* CỘT TRÁI: HIỂN THỊ MENU */}
      <div style={{ flex: 6, padding: '20px', backgroundColor: '#f9f9f9', overflowY: 'auto' }}>
        <h2 style={{ color: '#2c3e50', marginTop: 0 }}>📱 Gọi Món - {activeTableId.replace('_', ' ')}</h2>
        
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '20px', backgroundColor: 'white', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <input type="text" placeholder="🔍 Tìm nhanh món ăn..." value={searchMon} onChange={(e) => setSearchMon(e.target.value)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #dcdcdc', fontSize: '16px' }} />
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid #dcdcdc', minWidth: '150px', fontSize: '16px' }}>
            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        
        {filteredMenuItems.length === 0 ? <p style={{ textAlign: 'center', color: 'gray' }}>Không tìm thấy món nào.</p> : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', paddingBottom: '20px' }}>
            {filteredMenuItems.map((mon, index) => (
              <div key={index} style={{ backgroundColor: 'white', padding: '15px', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', position: 'relative', opacity: mon.isAvailable ? 1 : 0.6 }}>
                <div style={{ width: '100%', height: '180px', marginBottom: '15px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
                  <img src={mon.image || 'https://via.placeholder.com/150'} alt={mon.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h4 style={{ margin: '0 0 10px 0', color: '#c0392b', fontSize: '18px' }}>{mon.name}</h4>
                <p style={{ margin: '0 0 15px 0', color: '#2980b9', fontWeight: 'bold', fontSize: '16px' }}>{mon.price.toLocaleString()} VNĐ</p>
                {mon.isAvailable ? (
                  <button onClick={() => addToCart(mon)} style={{ marginTop: 'auto', padding: '12px 15px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', width: '100%', fontWeight: 'bold', fontSize: '15px' }}>🛒 Chọn món</button>
                ) : (
                  <button disabled style={{ marginTop: 'auto', padding: '12px 15px', backgroundColor: '#95a5a6', color: 'white', border: 'none', borderRadius: '8px', cursor: 'not-allowed', width: '100%', fontWeight: 'bold', fontSize: '15px' }}>❌ Tạm hết</button>
                )}
                {!mon.isAvailable && (
                  <div style={{ position: 'absolute', top: '25px', right: '-10px', backgroundColor: '#e74c3c', color: 'white', padding: '5px 20px', fontWeight: 'bold', transform: 'rotate(15deg)', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', fontSize: '14px', letterSpacing: '1px' }}>
                    SOLD OUT
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CỘT PHẢI: TRẠNG THÁI ĐƠN HÀNG VÀ GIỎ HÀNG */}
      <div style={{ flex: 4, display: 'flex', flexDirection: 'column', backgroundColor: '#ecf0f1', borderLeft: '3px solid #bdc3c7', height: '100%' }}>
        
        {/* TẦNG TRÊN: LỊCH SỬ & TRẠNG THÁI MÓN */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <h2 style={{ color: '#2980b9', marginTop: 0 }}>🔔 Trạng thái món ăn</h2>
          {hasOpenOrders && (
            <button 
              onClick={() => {
                if (!canRequestPayment) return alert("Bếp chưa hoàn thành tất cả món. Vui lòng đợi!");
                setShowPaymentSelection(true); 
              }} 
              disabled={!canRequestPayment} 
              style={{ marginBottom: '15px', width: '100%', padding: '12px', backgroundColor: canRequestPayment ? '#e67e22' : '#bdc3c7', color: 'white', border: 'none', borderRadius: '8px', cursor: canRequestPayment ? 'pointer' : 'not-allowed', fontWeight: 'bold', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              💵 YÊU CẦU THANH TOÁN
            </button>
          )}
          {myTrackingOrders.length === 0 ? <p style={{ color: '#7f8c8d' }}>Bạn chưa đặt món nào.</p> : (
            myTrackingOrders.map((order, index) => (
              <div key={index} style={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', marginBottom: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <div style={{ borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '10px', fontSize: '12px', color: 'gray' }}>Mã đơn: {order._id.slice(-6)}</div>
                {order.items.map((mon, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div>
                      <strong style={{ fontSize: '15px', color: '#2c3e50', textDecoration: mon.status === 'Hết món' ? 'line-through' : 'none' }}>
                        {mon.quantity}x {mon.menuItemId}
                      </strong>
                    </div>
                    {mon.status === 'Hoàn thành' && <span style={{ backgroundColor: '#2ecc71', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>✅ Đã xong</span>}
                    {mon.status === 'Hết món' && <span style={{ backgroundColor: '#e74c3c', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>❌ Đã hết</span>}
                    {(mon.status === 'Chờ tiếp nhận' || mon.status === 'Đang nấu') && <span style={{ backgroundColor: '#f39c12', color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: 'bold' }}>🍳 Đang nấu</span>}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>

        {/* TẦNG DƯỚI: GIỎ HÀNG (CỐ ĐỊNH) */}
        {cart.length > 0 && (
          <div style={{ backgroundColor: 'white', padding: '20px', borderTop: '4px solid #27ae60', boxShadow: '0 -4px 15px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', maxHeight: '55vh' }}>
            <h3 style={{ margin: '0 0 15px 0', color: '#27ae60' }}>🛒 Giỏ hàng ({cart.length} món)</h3>
            
            <div style={{ overflowY: 'auto', paddingRight: '5px', flex: 1 }}>
              {cart.map((item, index) => (
                <div key={index} style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px dashed #ecf0f1' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', fontSize: '15px', color: '#2c3e50' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(item.menuItemId, e.target.value)} style={{ width: '45px', padding: '6px', textAlign: 'center', borderRadius: '6px', border: '2px solid #bdc3c7', fontSize: '14px', fontWeight: 'bold', color: '#2980b9' }} />
                      <span style={{ fontSize: '14px' }}>{item.menuItemId}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '14px' }}>{(item.price * (parseInt(item.quantity) || 0)).toLocaleString()} đ</span>
                      <button onClick={() => removeFromCart(item.menuItemId)} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }} title="Xóa món này">✕</button>
                    </div>
                  </div>
                  <input type="text" placeholder="Ghi chú (VD: Ít cay)..." value={item.note} onChange={(e) => updateNote(item.menuItemId, e.target.value)} style={{ width: '100%', padding: '8px', marginTop: '8px', borderRadius: '6px', border: '1px solid #bdc3c7', fontSize: '13px' }} />
                </div>
              ))}
            </div>

            <div style={{ borderTop: '2px solid #ecf0f1', paddingTop: '15px', marginTop: '5px' }}>
              <h3 style={{ textAlign: 'right', color: '#e74c3c', fontSize: '20px', margin: '0 0 10px 0' }}>Tổng: {totalAmount.toLocaleString()} đ</h3>
              <button onClick={handleOrder} style={{ width: '100%', padding: '15px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>🚀 GỬI ORDER</button>
            </div>
          </div>
        )}

      </div>

      {/* POPUP 1: CHỌN HÌNH THỨC THANH TOÁN */}
      {showPaymentSelection && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', width: '400px', textAlign: 'center' }}>
            <h2 style={{ marginTop: 0, color: '#2c3e50' }}>Chọn hình thức thanh toán</h2>
            <p style={{ color: '#7f8c8d', marginBottom: '25px' }}>Vui lòng chọn 1 trong 2 hình thức bên dưới</p>
            
            <button onClick={() => submitPaymentRequest('CASH')} style={{ display: 'block', width: '100%', padding: '15px', marginBottom: '15px', backgroundColor: '#27ae60', color: 'white', border: 'none', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>
              💵 THANH TOÁN TIỀN MẶT
            </button>
            <button onClick={() => submitPaymentRequest('BANK_TRANSFER')} style={{ display: 'block', width: '100%', padding: '15px', marginBottom: '20px', backgroundColor: '#2980b9', color: 'white', border: 'none', borderRadius: '10px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>
              💳 CHUYỂN KHOẢN / QUÉT MÃ QR
            </button>
            
            <button onClick={() => setShowPaymentSelection(false)} style={{ padding: '10px 20px', backgroundColor: 'transparent', color: '#7f8c8d', border: '1px solid #7f8c8d', borderRadius: '5px', cursor: 'pointer' }}>
              Hủy
            </button>
          </div>
        </div>
      )}

      {/* POPUP 2: KHÓA MÀN HÌNH & HIỂN THỊ MÃ QR */}
      {showBillOverlay && displayBill && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', width: '500px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
            
            {paymentSuccess ? (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '70px', marginBottom: '15px', animation: 'popIn 0.5s ease' }}>✅</div>
                <h2 style={{ color: '#27ae60', margin: '0 0 15px 0' }}>THANH TOÁN THÀNH CÔNG!</h2>
                <p style={{ color: '#34495e', fontSize: '16px', fontWeight: 'bold' }}>Cảm ơn quý khách đã sử dụng dịch vụ.</p>
                <p style={{ color: '#95a5a6', fontSize: '14px', marginTop: '20px' }}>(Màn hình sẽ tự động đóng sau vài giây...)</p>
                <style>{`@keyframes popIn { 0% { transform: scale(0); } 80% { transform: scale(1.2); } 100% { transform: scale(1); } }`}</style>
              </div>
            ) : (
              <>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <h2 style={{ color: '#e67e22', margin: '0 0 10px 0' }}>⏳ ĐANG CHỜ XỬ LÝ</h2>
                  {currentPaymentMethod === 'CASH' ? (
                    <p style={{ color: '#7f8c8d', margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Vui lòng chờ nhân viên đến hỗ trợ thanh toán TIỀN MẶT.</p>
                  ) : (
                    <p style={{ color: '#2980b9', margin: 0, fontSize: '16px', fontWeight: 'bold' }}>Vui lòng quét mã QR bên dưới để thanh toán.</p>
                  )}
                </div>
                
                {currentPaymentMethod === 'BANK_TRANSFER' && (
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <img src={qrUrl} alt="QR Code Thanh Toán" style={{ width: '100%', maxWidth: '300px', borderRadius: '10px', border: '2px solid #ecf0f1', padding: '10px' }} />
                  </div>
                )}

                <h3 style={{ marginTop: 0, borderBottom: '2px solid #ecf0f1', paddingBottom: '10px' }}>Chi tiết Hóa đơn - {displayBill.tableId}</h3>
                
                {displayBill.orders.map((order, idx) => (
                  <div key={order._id} style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                    <ul style={{ paddingLeft: '0', listStyleType: 'none', margin: '0' }}>
                      {order.items.map((item, i2) => (
                        <li key={i2} style={{ textDecoration: item.status === 'Hết món' ? 'line-through' : 'none', color: item.status === 'Hết món' ? '#e74c3c' : 'inherit', marginBottom: '5px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px' }}>
                            <span>{item.quantity}x {item.menuItemId} {item.status === 'Hết món' && <span style={{fontSize: '13px'}}><br/>(Hết - Không tính tiền)</span>}</span>
                            <span style={{ fontWeight: 'bold' }}>{(item.price * item.quantity).toLocaleString()} đ</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                
                <h3 style={{ textAlign: 'right', color: '#c0392b', fontSize: '24px', borderTop: '2px solid #ecf0f1', paddingTop: '15px' }}>
                  Tổng cần thanh toán: {(displayBill.totalAmount || 0).toLocaleString()} đ
                </h3>
                
                <div style={{ textAlign: 'center', marginTop: '15px' }}>
                  <div style={{ display: 'inline-block', width: '30px', height: '30px', border: '4px solid #ecf0f1', borderTop: '4px solid #3498db', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                  <p style={{ fontSize: '13px', color: '#7f8c8d' }}>Màn hình sẽ mở khóa khi nhân viên xác nhận.</p>
                  <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                </div>
              </>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
}

export default Tablet;