import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import styles from './Tablet.module.scss';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

function Tablet({ socket }) {
  const [activeTableId, setActiveTableId] = useState(null); 
  const [menuItems, setMenuItems] = useState([]); 
  const [cart, setCart] = useState([]); 
  const [myTrackingOrders, setMyTrackingOrders] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [pinInput, setPinInput] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [tables, setTables] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Tải thực đơn và danh sách bàn
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [menuRes, tableRes] = await Promise.all([
        fetch(`${API_URL}/admin/menu/all`),
        fetch(`${API_URL}/manager/tables`)
      ]);
      if (menuRes.ok) {
        const data = await menuRes.json();
        setMenuItems(data);
      }
      if (tableRes.ok) {
        const data = await tableRes.json();
        setTables(data);
      }
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 2. Xử lý mở Tablet (Unlock)
  const handleUnlock = async () => {
    if (!pinInput) return Swal.fire('Thông báo', 'Vui lòng nhập mã PIN!', 'warning');
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/customer/verify-pin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: pinInput }) 
      });
      const data = await res.json();
      if (res.ok) {
        setIsUnlocked(true);
        setActiveTableId(data.tableId);
        localStorage.setItem('active_table_id', data.tableId);
        localStorage.setItem('tablet_unlocked', 'true');
        fetchOldOrders(data.tableId);
        Swal.fire({
          title: 'Mở bàn thành công!',
          text: `Chào mừng quý khách tại bàn ${data.tableId}`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      } else {
        Swal.fire('Thất bại', data.message || "Mã PIN không chính xác!", 'error');
      }
    } catch (error) {
      Swal.fire('Lỗi', 'Không thể kết nối máy chủ!', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const savedTableId = localStorage.getItem('active_table_id');
    const unlocked = localStorage.getItem('tablet_unlocked');
    if (savedTableId && unlocked === 'true') {
      setActiveTableId(savedTableId);
      setIsUnlocked(true);
      fetchOldOrders(savedTableId);
    }
  }, []);

  const handleSelectTable = (tableId) => {
    setActiveTableId(tableId);
    localStorage.setItem('active_table_id', tableId);
    fetchOldOrders(tableId);
  };

  const handleLogout = () => {
    setActiveTableId(null);
    setIsUnlocked(false);
    localStorage.removeItem('active_table_id');
    localStorage.removeItem('tablet_unlocked');
  };

  const fetchOldOrders = async (tableId) => {
    try {
      const res = await fetch(`${API_URL}/customer/${tableId}`);
      if (res.ok) {
        const data = await res.json();
        setMyTrackingOrders(data);
      }
    } catch (error) {}
  };

  // 3. Quản lý giỏ hàng
  const addToCart = (item) => {
    const existing = cart.find(c => c._id === item._id);
    if (existing) {
      setCart(cart.map(c => c._id === item._id ? { ...c, quantity: c.quantity + 1 } : c));
    } else {
      setCart([...cart, { ...item, quantity: 1, menuItemId: item.name }]);
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
        body: JSON.stringify({ 
          tableId: activeTableId, 
          items: cart.map(item => ({
            menuItemId: item.name,
            quantity: item.quantity,
            price: item.price
          }))
        })
      });
      if (res.ok) {
        Swal.fire('Thành công', 'Đã gửi đơn hàng xuống bếp!', 'success');
        setCart([]);
        fetchOldOrders(activeTableId);
      }
    } catch (error) {
      Swal.fire('Lỗi', 'Không thể đặt món lúc này!', 'error');
    } finally {
      setIsOrdering(false);
    }
  };

  // 5. Yêu cầu thanh toán
  const handleRequestPayment = async () => {
    const { value: paymentMethod } = await Swal.fire({
      title: 'Xác nhận thanh toán',
      text: "Quý khách vui lòng chọn phương thức thanh toán:",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Tiền mặt 💵',
      cancelButtonText: 'Chuyển khoản 💳',
      confirmButtonColor: '#27ae60',
      cancelButtonColor: '#2980b9',
      reverseButtons: true
    });

    // Swal returns value: true for confirm, undefined for cancel, but we want to know WHICH button
    // Actually, it's better to use input options or custom buttons
    
    const result = await Swal.fire({
      title: 'Chọn phương thức thanh toán',
      input: 'radio',
      inputOptions: {
        'CASH': 'Tiền mặt 💵',
        'BANK_TRANSFER': 'Chuyển khoản 💳'
      },
      inputValidator: (value) => {
        if (!value) return 'Quý khách vui lòng chọn 1 phương thức!';
      },
      showCancelButton: true,
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Hủy'
    });

    if (result.isConfirmed) {
      setIsLoading(true);
      try {
        const res = await fetch(`${API_URL}/customer/request-payment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            tableId: activeTableId,
            paymentMethod: result.value 
          })
        });
        if (res.ok) {
          Swal.fire('Đã gửi yêu cầu', 'Nhân viên sẽ đến hỗ trợ quý khách ngay!', 'success');
          // Sau khi yêu cầu thanh toán, có thể xóa session hoặc để Manager confirm mới xóa
        }
      } catch (error) {
        Swal.fire('Lỗi', 'Không thể gửi yêu cầu thanh toán!', 'error');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Lọc thực đơn
  const categories = ['Tất cả', ...new Set(menuItems.map(item => item.category))];
  const filteredMenu = selectedCategory === 'Tất cả' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  // Màn hình 1: Nhập PIN
  if (!isUnlocked) {
    return (
      <div className={styles.loginOverlay}>
        <div className={styles.loginCard}>
          <h1>🔓 Mở Khóa Tablet</h1>
          <p>Vui lòng nhập mã PIN được cung cấp bởi nhân viên để bắt đầu.</p>
          <input 
            type="password" 
            placeholder="Nhập mã PIN..." 
            value={pinInput} 
            onChange={(e) => setPinInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
          />
          <button onClick={handleUnlock} disabled={isLoading}>
            {isLoading ? 'Đang kiểm tra...' : 'XÁC NHẬN'}
          </button>
        </div>
      </div>
    );
  }

  // Màn hình 2: Chọn bàn (Nếu chưa chọn)
  if (!activeTableId) {
    return (
      <div className={styles.tableSelectionOverlay}>
        <div className={styles.tableSelectionContainer}>
          <h2>📍 CHỌN BÀN CỦA QUÝ KHÁCH</h2>
          <p>Vui lòng chọn số bàn bạn đang ngồi để tiếp tục gọi món.</p>
          <div className={styles.tableGrid}>
            {tables.map(table => (
              <button 
                key={table._id}
                className={`${styles.tableBtn} ${table.status !== 'Trống' ? styles.occupied : ''}`}
                onClick={() => handleSelectTable(table.tableId)}
              >
                Bàn {table.tableId}
                <span>({table.status})</span>
              </button>
            ))}
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>Đăng xuất</button>
        </div>
      </div>
    );
  }

  // Màn hình 3: Thực đơn chính
  return (
    <div className={styles.tabletContainer}>
      <header className={styles.header}>
        <div className={styles.tableInfo}>
          <span className={styles.tableNumber}>BÀN: {activeTableId}</span>
          <button className={styles.changeTable} onClick={() => setActiveTableId(null)}>Đổi bàn</button>
        </div>
        <div className={styles.cartSummary}>
          <span>🛒 Giỏ hàng: <strong>{cart.length} món</strong></span>
          <button onClick={handleLogout}>🔓 Khóa Tablet</button>
        </div>
      </header>

      <div className={styles.mainLayout}>
        <aside className={styles.sidebar}>
          {categories.map(cat => (
            <button 
              key={cat} 
              className={selectedCategory === cat ? styles.active : ''}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </aside>

        <main className={styles.menuContent}>
          <div className={styles.menuGrid}>
            {filteredMenu.map(item => (
              <div key={item._id} className={`${styles.menuCard} ${item.isSoldOut ? styles.soldOut : ''}`}>
                <img src={item.image} alt={item.name} />
                <div className={styles.itemInfo}>
                  <h3>{item.name}</h3>
                  <p className={styles.price}>{item.price.toLocaleString()}đ</p>
                  <button 
                    onClick={() => !item.isSoldOut && addToCart(item)}
                    disabled={item.isSoldOut}
                    className={item.isSoldOut ? styles.soldOutBtn : styles.addBtn}
                  >
                    {item.isSoldOut ? 'HẾT HÀNG' : 'THÊM +'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>

        <aside className={styles.cartSidebar}>
          <h2>Đơn hàng của bạn</h2>
          <div className={styles.cartItems}>
            {cart.map(item => (
              <div key={item._id} className={styles.cartItem}>
                <div className={styles.itemDetail}>
                  <span>{item.name}</span>
                  <strong>{(item.price * item.quantity).toLocaleString()}đ</strong>
                </div>
                <div className={styles.qtyControl}>
                  <button onClick={() => updateCartQty(item._id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCartQty(item._id, 1)}>+</button>
                </div>
              </div>
            ))}
            {cart.length === 0 && <p className={styles.emptyCart}>Giỏ hàng trống...</p>}
          </div>
          
          <div className={styles.cartFooter}>
            <div className={styles.total}>
              <span>Tổng cộng:</span>
              <strong>{cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toLocaleString()}đ</strong>
            </div>
            <button className={styles.orderBtn} onClick={handleOrder} disabled={cart.length === 0}>
              ĐẶT MÓN NGAY
            </button>
            <button className={styles.paymentBtn} onClick={handleRequestPayment}>
              YÊU CẦU THANH TOÁN
            </button>
          </div>
          
          <div className={styles.tracking}>
            <h3>Theo dõi đơn:</h3>
            {myTrackingOrders.map((order, i) => (
              <div key={i} className={styles.trackingOrder}>
                {order.items.map((item, idx) => (
                  <div key={idx} className={styles.trackingItem}>
                    <span>{item.menuItemId}</span>
                    <span className={styles[item.status]}>{item.status}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Tablet;
