import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

function Chef({ socket }) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' hoặc 'menu'

  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  const fetchPendingOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/chef/pending`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setPendingOrders(data);
        } else {
          setPendingOrders([]);
        }
      } else {
        setPendingOrders([]);
      }
    } catch (error) {}
  };

  const fetchCompletedOrders = async () => {
    try {
      const res = await fetch(`${API_URL}/chef/completed`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setCompletedOrders(data);
        } else {
          setCompletedOrders([]);
        }
      } else {
        setCompletedOrders([]);
      }
    } catch (error) {}
  };

  const fetchMenu = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/menu/all`); 
      if (res.ok) {
        const data = await res.json();
        setMenuItems(data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchPendingOrders();
    fetchCompletedOrders();
    fetchMenu();

    if (socket) {
      socket.on('NEW_ORDER_RECEIVED', () => fetchPendingOrders());
      socket.on('ITEM_STATUS_UPDATED', () => { fetchPendingOrders(); fetchCompletedOrders(); });
      socket.on('MENU_ITEM_UPDATED', () => fetchMenu());
      socket.on('MENU_RESET_SUCCESS', () => fetchMenu());

      return () => {
        socket.off('NEW_ORDER_RECEIVED');
        socket.off('ITEM_STATUS_UPDATED');
        socket.off('MENU_ITEM_UPDATED');
        socket.off('MENU_RESET_SUCCESS');
      };
    }
  }, [socket]);

  // HÀM CẬP NHẬT TRẠNG THÁI MÓN TRONG ĐƠN (XONG HOẶC HẾT)
  const handleUpdateItem = async (orderId, itemId, status) => {
    try {
      const res = await fetch(`${API_URL}/chef/update-item-status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, itemId, status })
      });
      if (res.ok) {
        fetchPendingOrders();
        fetchCompletedOrders();
      }
    } catch (error) { alert("Lỗi kết nối Backend!"); }
  };

  // HÀM BÁO HẾT MÓN TRÊN TOÀN HỆ THỐNG
  const handleToggleMenu = async (id, currentStatus) => {
    try {
      const res = await fetch(`${API_URL}/manager/menu/toggle-sold-out`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isSoldOut: !currentStatus })
      });
      if (res.ok) fetchMenu(); 
      else alert("Không thể cập nhật trạng thái món!");
    } catch (error) { alert("Lỗi kết nối khi cập nhật món!"); }
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#34495e', color: 'white', minHeight: '100vh', fontFamily: 'Arial' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #2c3e50', paddingBottom: '15px' }}>
        <h1 style={{ color: '#f1c40f', margin: 0 }}>👨‍🍳 MÀN HÌNH NHÀ BẾP</h1>
        <div>
          <button onClick={() => setActiveTab('orders')} style={{ padding: '10px 20px', marginRight: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', border: 'none', borderRadius: '5px', backgroundColor: activeTab === 'orders' ? '#3498db' : '#7f8c8d', color: 'white' }}>
            🔔 Quản lý Order
          </button>
          <button onClick={() => setActiveTab('menu')} style={{ padding: '10px 20px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', border: 'none', borderRadius: '5px', backgroundColor: activeTab === 'menu' ? '#e67e22' : '#7f8c8d', color: 'white' }}>
            📋 Quản lý Thực Đơn (Báo Hết)
          </button>
        </div>
      </div>

      {activeTab === 'orders' && (
        <div>
          <h2 style={{ color: '#ecf0f1' }}>Đơn đang chế biến</h2>
          {pendingOrders.length === 0 ? <p>Hiện chưa có đơn hàng nào...</p> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '40px' }}>
              {pendingOrders.map((order, index) => (
                <div key={index} style={{ backgroundColor: 'white', color: 'black', padding: '15px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
                  <h3 style={{ color: '#c0392b', borderBottom: '1px solid #eee', paddingBottom: '10px', margin: '0 0 10px 0' }}>Bàn: {order.tableId}</h3>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px dashed #ecf0f1', opacity: (item.status === 'Hoàn thành' || item.status === 'Hết món') ? 0.4 : 1 }}>
                      <div style={{ textDecoration: item.status === 'Hết món' ? 'line-through' : 'none' }}>
                        <span style={{ fontSize: '18px' }}><strong>{item.quantity}x {item.menuItemId}</strong></span>
                        {item.note && <div style={{ fontSize: '14px', color: '#e67e22', marginTop: '5px' }}>*Ghi chú: {item.note}</div>}
                      </div>
                      
                      {item.status === 'Chờ tiếp nhận' || item.status === 'Đang nấu' ? (
                        <div style={{ display: 'flex', gap: '5px' }}>
                          <button onClick={() => handleUpdateItem(order._id, item._id, 'Hoàn thành')} style={{ backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', padding: '8px 12px', fontWeight: 'bold' }}>✅ Xong</button>
                          <button onClick={() => handleUpdateItem(order._id, item._id, 'Hết món')} style={{ backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', padding: '8px 12px', fontWeight: 'bold' }}>❌ Báo Hết</button>
                        </div>
                      ) : (
                        <span style={{ color: item.status === 'Hết món' ? '#e74c3c' : '#27ae60', fontWeight: 'bold', alignSelf: 'center' }}>
                          {item.status}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          <h2 style={{ color: '#ecf0f1', marginTop: '40px' }}>Đơn đã hoàn thành</h2>
          {completedOrders.length === 0 ? <p>Chưa có đơn nào hoàn thành.</p> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {completedOrders.map((order, index) => (
                <div key={index} style={{ backgroundColor: '#bdc3c7', color: 'black', padding: '15px', borderRadius: '10px', opacity: 0.8 }}>
                  <h3 style={{ color: '#2c3e50', borderBottom: '1px solid #eee', margin: '0 0 10px 0', paddingBottom: '10px' }}>Bàn: {order.tableId}</h3>
                  {order.items.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', textDecoration: item.status === 'Hết món' ? 'line-through' : 'none' }}>
                      <span><strong>{item.quantity}x {item.menuItemId}</strong></span>
                      <span style={{ color: item.status === 'Hết món' ? '#c0392b' : '#27ae60', fontWeight: 'bold' }}>{item.status}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'menu' && (
        <div>
          <h2 style={{ color: '#ecf0f1' }}>Báo tình trạng món ăn</h2>
          <p style={{ color: '#bdc3c7' }}>Khi bạn báo Hết món, món ăn sẽ tự động bị báo Sold Out trên toàn bộ Tablet của khách hàng.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {menuItems.map(mon => (
              <div key={mon._id} style={{ backgroundColor: 'white', color: 'black', padding: '15px', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: mon.isSoldOut ? 0.6 : 1 }}>
                <img src={mon.image || 'https://via.placeholder.com/100'} alt={mon.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', marginBottom: '10px' }} />
                <h3 style={{ margin: '0 0 5px 0', textAlign: 'center', fontSize: '18px' }}>{mon.name}</h3>
                <span style={{ color: 'gray', fontSize: '13px', marginBottom: '15px' }}>({mon.category})</span>
                <button onClick={() => handleToggleMenu(mon._id, mon.isSoldOut)} style={{ padding: '10px 20px', width: '100%', backgroundColor: mon.isSoldOut ? '#c0392b' : '#27ae60', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
                  {mon.isSoldOut ? '❌ ĐÃ HẾT MÓN' : '✅ ĐANG CÒN HÀNG'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Chef;