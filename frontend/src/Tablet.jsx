import React, { useState, useEffect } from 'react';
import styles from './Tablet.module.scss';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Tablet({ socket }) {
  const [activeTableId, setActiveTableId] = useState(null); 
  const [menuItems, setMenuItems] = useState([]); 
  const [cart, setCart] = useState([]); 
  const [myTrackingOrders, setMyTrackingOrders] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [pinInput, setPinInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [showBill, setShowBill] = useState(false);
  const [displayBill, setDisplayBill] = useState(null);

  // 1. Tải thực đơn
  const fetchMenu = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/menu/all`);
      if (res.ok) {
        const data = await res.json();
        setMenuItems(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Lỗi tải menu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // 2. Xử lý mở bàn (Unlock)
  const handleUnlock = async () => {
    if (!pinInput) return alert("Vui lòng nhập mã PIN!");
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/customer/verify-pin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinInput }) 
      });
      const data = await res.json();
      if (res.ok) {
        setActiveTableId(data.tableId);
        fetchOldOrders(data.tableId);
      } else {
        alert(data.message || "Mã PIN không chính xác!");
      }
    } catch (error) {
      alert("Lỗi kết nối máy chủ!");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOldOrders = async (tableId) => {
    try {
      const res = await fetch(`${API_URL}/customer/${tableId}`);
      if (res.ok) setMyTrackingOrders(await res.json());
    } catch (error) {}
  };

  // 3. Quản lý giỏ hàng
  const addToCart = (item) => {
    const existing = cart.find(c => c._id === item._id);
    if (existing) {
      setCart(cart.map(c => c._id === item._id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const updateCartQty = (id, delta) => {
    setCart(cart.map(c => {
      if (c._id === id) {
        const newQty = Math.max(0, c.quantity + delta);
        return newQty === 0 ? null : { ...c, quantity: newQty };
      }
      return c;
    }).filter(Boolean));
  };

  // 4. Đặt món
  const handleOrder = async () => {
    if (cart.length === 0) return;
    setIsOrdering(true);
    try {
      const res = await fetch(`${API_URL}/customer/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableId: activeTableId, items: cart })
      });
      if (res.ok) {
        alert("✅ Đã gửi đơn hàng xuống bếp!");
        setCart([]);
        fetchOldOrders(activeTableId);
      }
    } catch (error) {
      alert("Lỗi đặt món!");
    } finally {
      setIsOrdering(false);
    }
  };

  // 5. Yêu cầu thanh toán
  const handleRequestPayment = async () => {
    if (!window.confirm("Bạn muốn yêu cầu thanh toán cho bàn này?")) return;
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/customer/request-payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableId: activeTableId })
      });
      if (res.ok) {
        const data = await res.json();
        setDisplayBill(data.order);
        setShowBill(true);
      }
    } catch (error) {
      alert("Lỗi gửi yêu cầu thanh toán!");
    } finally {
      setIsLoading(false);
    }
  };

  // Lọc thực đơn
  const categories = ['Tất cả', ...new Set(menuItems.map(item => item.category))];
  const filteredMenu = selectedCategory === 'Tất cả' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  // Màn hình đăng nhập (PIN)
  if (!activeTableId) {
    return (
      <div className={styles.tabletContainer}>
        <div className={styles.loginScreen}>
          <h1>CHÀO MỪNG QUÝ KHÁCH</h1>
          <p>Vui lòng nhập mã PIN do nhân viên cung cấp để gọi món</p>
          <div className={styles.pinBox}>
            <input 
              type="text" 
              maxLength="6" 
              placeholder="Mã PIN 6 số..." 
              value={pinInput}
              onChange={e => setPinInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleUnlock()}
            />
            <button onClick={handleUnlock} disabled={isLoading}>
              {isLoading ? 'ĐANG MỞ...' : 'MỞ BÀN'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tabletContainer}>
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
          <p>Vui lòng đợi trong giây lát...</p>
        </div>
      )}

      <div className={styles.mainContent}>
        {/* Cột 1: Danh mục */}
        <div className={styles.sidebar}>
          <h2>Thực Đơn</h2>
          <div className={styles.categoryList}>
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.active : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cột 2: Thực đơn */}
        <div className={styles.menuGrid}>
          {filteredMenu.map(item => (
            <div key={item._id} className={styles.menuCard}>
              <div className={styles.imageWrapper}>
                <img src={item.image || 'https://placehold.co/500'} alt={item.name} />
                <span className={styles.priceTag}>{item.price.toLocaleString()} đ</span>
              </div>
              <div className={styles.cardInfo}>
                <h3>{item.name}</h3>
                <p className={styles.desc}>{item.description || "Món ăn ngon miệng, đảm bảo vệ sinh an toàn thực phẩm."}</p>
                <button 
                  className={styles.addBtn}
                  onClick={() => addToCart(item)}
                  disabled={item.isSoldOut}
                >
                  {item.isSoldOut ? 'HẾT HÀNG' : '+ THÊM VÀO GIỎ'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cột 3: Giỏ hàng & Theo dõi */}
        <div className={styles.cartSidebar}>
          <div className={styles.cartHeader}>
            <h2>Giỏ hàng</h2>
            <span className={styles.tableNum}>Bàn #{activeTableId}</span>
          </div>
          
          <div className={styles.cartList}>
            {cart.length === 0 && <p style={{textAlign:'center', color:'#7f8c8d', marginTop:'50px'}}>Chưa có món nào trong giỏ.</p>}
            {cart.map(item => (
              <div key={item._id} className={styles.cartItem}>
                <div className={styles.itemDetails}>
                  <h4>{item.name}</h4>
                  <p>{(item.price * item.quantity).toLocaleString()} đ</p>
                </div>
                <div className={styles.qtyControls}>
                  <button onClick={() => updateCartQty(item._id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCartQty(item._id, 1)}>+</button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.cartFooter}>
            <div className={styles.totalRow}>
              <span>Tổng cộng:</span>
              <span>{cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()} đ</span>
            </div>
            <button 
              className={styles.orderBtn}
              onClick={handleOrder}
              disabled={cart.length === 0 || isOrdering}
            >
              {isOrdering ? 'ĐANG GỬI...' : 'XÁC NHẬN ĐẶT MÓN'}
            </button>
            <button 
              className={styles.paymentBtn}
              onClick={handleRequestPayment}
            >
              YÊU CẦU THANH TOÁN
            </button>
          </div>
        </div>
      </div>

      {/* Popup Hóa đơn */}
      {showBill && displayBill && (
        <div className={styles.loadingOverlay}>
          <div style={{ background: 'white', color: '#2c3e50', padding: '30px', borderRadius: '20px', width: '400px', maxWidth: '90%' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', borderBottom: '2px dashed #ecf0f1', paddingBottom: '10px' }}>HÓA ĐƠN TẠM TÍNH</h2>
            <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
              {displayBill.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span>{item.name} x{item.quantity}</span>
                  <span>{(item.price * item.quantity).toLocaleString()} đ</span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '2px solid #2c3e50', paddingTop: '15px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '1.2rem' }}>
              <span>TỔNG CỘNG:</span>
              <span style={{ color: '#e74c3c' }}>{displayBill.totalAmount.toLocaleString()} đ</span>
            </div>
            <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: '#7f8c8d' }}>Vui lòng đợi nhân viên tại quầy xác nhận thanh toán.</p>
            <button 
              onClick={() => setShowBill(false)}
              style={{ width: '100%', marginTop: '20px', padding: '12px', background: '#2c3e50', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}
            >
              ĐÓNG
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tablet;
