import React, { useState, useEffect } from 'react';

function Chef({ socket }) {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' hoặc 'menu'

  const [pendingOrders, setPendingOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  const fetchPendingOrders = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/chef/pending');
      const data = await res.json();
      setPendingOrders(data); 
    } catch (error) { console.log("Lỗi tải đơn hàng đang chờ"); }
  };

  const fetchCompletedOrders = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/chef/completed');
      const data = await res.json();
      setCompletedOrders(data);
    } catch (error) { console.log("Lỗi tải đơn hàng đã hoàn thành"); }
  };

  const fetchMenu = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/menu/all'); 
      const data = await res.json();
      setMenuItems(data);
    } catch (error) { console.log("Lỗi tải menu cho bếp"); }
  };

  useEffect(() => {
    fetchPendingOrders();
    fetchCompletedOrders();
    fetchMenu();

    socket.on('NEW_ORDER_RECEIVED', (newOrder) => {
      setPendingOrders((prev) => [newOrder, ...prev]);
    });

    // NHẬN STATUS MỚI TỪ SOCKET (Hoàn thành hoặc Hết món)
    socket.on('ITEM_COMPLETED', ({ orderId, itemId, status }) => {
      setPendingOrders((prev) => prev.map(order => {
        if (order._id === orderId) {
          const newItems = order.items.map(item => 
            item._id === itemId ? { ...item, status: status } : item
          );
          return { ...order, items: newItems };
        }
        return order;
      }));
    });

    socket.on('ORDER_COMPLETED', (completedOrder) => {
      setPendingOrders(prev => prev.filter(order => order._id !== completedOrder._id));
      setCompletedOrders(prev => [completedOrder, ...prev]);
    });

    return () => {
      socket.off('NEW_ORDER_RECEIVED');
      socket.off('ITEM_COMPLETED');
      socket.off('ORDER_COMPLETED');
    };
  }, [socket]);

  // HÀM CẬP NHẬT TRẠNG THÁI MÓN TRONG ĐƠN (XONG HOẶC HẾT)
  const handleUpdateItem = async (orderId, itemId, status) => {
    try {
      await fetch('http://localhost:5000/api/chef/update-item-status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, itemId, status })
      });
    } catch (error) { alert("Lỗi kết nối Backend!"); }
  };

  // HÀM BÁO HẾT MÓN TRÊN TOÀN HỆ THỐNG
  const handleToggleMenu = async (menuItemId, currentStatus) => {
    try {
      const res = await fetch('http://localhost:5000/api/chef/menu/toggle', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menuItemId: menuItemId, isAvailable: !currentStatus })
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
              <div key={mon._id} style={{ backgroundColor: 'white', color: 'black', padding: '15px', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: mon.isAvailable ? 1 : 0.6 }}>
                <img src={mon.image || 'https://via.placeholder.com/100'} alt={mon.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%', marginBottom: '10px' }} />
                <h3 style={{ margin: '0 0 5px 0', textAlign: 'center', fontSize: '18px' }}>{mon.name}</h3>
                <span style={{ color: 'gray', fontSize: '13px', marginBottom: '15px' }}>({mon.category})</span>
                <button onClick={() => handleToggleMenu(mon._id, mon.isAvailable)} style={{ padding: '10px 20px', width: '100%', backgroundColor: mon.isAvailable ? '#27ae60' : '#c0392b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
                  {mon.isAvailable ? '✅ ĐANG CÒN HÀNG' : '❌ ĐÃ HẾT MÓN'}
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