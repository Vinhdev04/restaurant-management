import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function AdminMenu({ socket }) { // ĐÃ THÊM PROP SOCKET Ở ĐÂY
  const [activeTab, setActiveTab] = useState('menu');

  const [menuItems, setMenuItems] = useState([]);
  const [searchMenu, setSearchMenu] = useState(''); 
  const [formData, setFormData] = useState({ name: '', price: '', category: 'Món chính', image: '' });
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ name: '', price: '', category: '', image: '' });

  const [tables, setTables] = useState([]);
  const [newTableId, setNewTableId] = useState('');

  const [revenueData, setRevenueData] = useState({
    dailyRevenue: 0,
    monthlyRevenue: 0,
    yearlyRevenue: 0,
    totalRevenue: 0,
    orders: []
  });

  useEffect(() => {
    fetchMenu();
    fetchTables();
    fetchRevenue(); 
  }, []);

  // ================= BẮT SÓNG REALTIME =================
  useEffect(() => {
    if (!socket) return;

    // Khi có ai đó mở bàn, ghép bàn, tách bàn
    socket.on('NEW_ORDER_RECEIVED', () => {
      fetchTables();
    });

    // Khi thu ngân xác nhận thanh toán xong
    socket.on('PAYMENT_CONFIRMED', () => {
      fetchTables(); // Cập nhật lại sơ đồ bàn
      fetchRevenue(); // Cập nhật lại tiền doanh thu ngay lập tức
    });

    return () => {
      socket.off('NEW_ORDER_RECEIVED');
      socket.off('PAYMENT_CONFIRMED');
    };
  }, [socket]);

  const fetchMenu = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/menu/all`);
      if(res.ok) setMenuItems(await res.json());
    } catch (error) { console.error("Lỗi tải menu:", error); }
  };

  const fetchTables = async () => {
    try {
      const res = await fetch(`${API_URL}/manager/tables`);
      if (res.ok) setTables(await res.json());
    } catch (error) { console.error("Lỗi tải bàn:", error); }
  };

  const fetchRevenue = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/revenue`);
      if (res.ok) {
        const data = await res.json();
        setRevenueData(data);
      }
    } catch (error) { console.error("Lỗi tải doanh thu:", error); }
  };

  const handleAddMenu = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/admin/menu/add`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData)
      });
      if (res.ok) {
        alert("🎉 Đã thêm món vào Database thành công!");
        setFormData({ name: '', price: '', category: 'Món chính', image: '' }); 
        fetchMenu();
      } else { alert("❌ Lỗi khi thêm món!"); }
    } catch (error) { alert("⚠️ Lỗi kết nối Backend!"); }
  };

  const handleSaveEdit = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/menu/edit/${editingId}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(editData)
      });
      if (res.ok) {
        alert("Cập nhật món thành công!");
        setEditingId(null);
        fetchMenu();
      }
    } catch (error) { alert("Lỗi kết nối!"); }
  };

  const handleDeleteMenu = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa món này không?")) return;
    try {
      const res = await fetch(`${API_URL}/admin/menu/delete/${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert("Đã xóa món!");
        fetchMenu();
      }
    } catch (error) { alert("Lỗi kết nối!"); }
  };

  const handleAddTable = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/admin/table/add`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ tableId: newTableId })
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setNewTableId('');
        fetchTables();
      } else { alert(data.message); }
    } catch (error) { alert("⚠️ Lỗi kết nối!"); }
  };

  const filteredMenuItems = menuItems.filter(mon => 
    mon.name.toLowerCase().includes(searchMenu.toLowerCase())
  );

  // ================= ÉP SẮP XẾP TỪ MỚI NHẤT ĐẾN CŨ NHẤT =================
  const sortedOrders = [...revenueData.orders].sort((a, b) => {
    const timeA = new Date(a.paymentConfirmedAt || a.updatedAt).getTime();
    const timeB = new Date(b.paymentConfirmedAt || b.updatedAt).getTime();
    return timeB - timeA; // Số to (mới hơn) xếp lên đầu
  });

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', backgroundColor: '#ecf0f1', minHeight: '100vh' }}>
      
      <div style={{ marginBottom: '20px', borderBottom: '2px solid #bdc3c7', paddingBottom: '10px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setActiveTab('menu')} style={{ padding: '10px 20px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', border: 'none', borderRadius: '5px', backgroundColor: activeTab === 'menu' ? '#e67e22' : '#bdc3c7', color: 'white' }}>🍕 KHO THỰC ĐƠN</button>
        <button onClick={() => setActiveTab('tables')} style={{ padding: '10px 20px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', border: 'none', borderRadius: '5px', backgroundColor: activeTab === 'tables' ? '#8e44ad' : '#bdc3c7', color: 'white' }}>🗺️ QUẢN LÝ SƠ ĐỒ BÀN</button>
        <button onClick={() => { setActiveTab('revenue'); fetchRevenue(); }} style={{ padding: '10px 20px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', border: 'none', borderRadius: '5px', backgroundColor: activeTab === 'revenue' ? '#27ae60' : '#bdc3c7', color: 'white' }}>📊 BÁO CÁO DOANH THU</button>
      </div>

      {/* ==================== TAB BÁO CÁO DOANH THU ==================== */}
      {activeTab === 'revenue' && (
        <div>
          <h2 style={{ marginTop: 0, color: '#2c3e50' }}>Thống kê doanh thu</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', borderLeft: '6px solid #3498db' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#7f8c8d', fontSize: '16px' }}>DOANH THU HÔM NAY</h3>
              <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#2c3e50' }}>{revenueData.dailyRevenue.toLocaleString()} đ</p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', borderLeft: '6px solid #2ecc71' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#7f8c8d', fontSize: '16px' }}>DOANH THU THÁNG NÀY</h3>
              <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#2c3e50' }}>{revenueData.monthlyRevenue.toLocaleString()} đ</p>
            </div>
            <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', borderLeft: '6px solid #9b59b6' }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#7f8c8d', fontSize: '16px' }}>DOANH THU NĂM NAY</h3>
              <p style={{ margin: 0, fontSize: '32px', fontWeight: 'bold', color: '#2c3e50' }}>{revenueData.yearlyRevenue.toLocaleString()} đ</p>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, color: '#27ae60' }}>🧾 Lịch sử đơn hàng đã thanh toán</h3>
            {sortedOrders.length === 0 ? <p>Chưa có đơn hàng nào được thanh toán.</p> : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#ecf0f1', borderBottom: '2px solid #bdc3c7' }}>
                      <th style={{ padding: '12px' }}>Mã đơn</th>
                      <th style={{ padding: '12px' }}>Bàn</th>
                      <th style={{ padding: '12px' }}>Thời gian thanh toán</th>
                      <th style={{ padding: '12px' }}>Hình thức</th>
                      <th style={{ padding: '12px', textAlign: 'right' }}>Tổng tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Render từ mảng đã sắp xếp */}
                    {sortedOrders.map((order, idx) => (
                      <tr key={order._id} style={{ borderBottom: '1px solid #eee', backgroundColor: idx % 2 === 0 ? 'white' : '#fafafa' }}>
                        <td style={{ padding: '12px', color: '#7f8c8d', fontSize: '14px' }}>{order._id.slice(-6)}</td>
                        <td style={{ padding: '12px', fontWeight: 'bold', color: '#2c3e50' }}>{order.tableId}</td>
                        <td style={{ padding: '12px' }}>{new Date(order.paymentConfirmedAt || order.updatedAt).toLocaleString('vi-VN')}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', color: 'white', backgroundColor: order.paymentMethod === 'BANK_TRANSFER' ? '#2980b9' : '#27ae60' }}>
                            {order.paymentMethod === 'BANK_TRANSFER' ? 'Chuyển khoản' : 'Tiền mặt'}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'right', fontWeight: 'bold', color: '#c0392b' }}>{order.totalAmount.toLocaleString()} đ</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== TAB QUẢN LÝ THỰC ĐƠN ==================== */}
      {activeTab === 'menu' && (
        <div>
          <form onSubmit={handleAddMenu} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
            <h3 style={{ marginTop: 0 }}>Thêm món ăn mới</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <input type="text" placeholder="Tên món (VD: Gà rán KFC)" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ padding: '10px', width: '200px', borderRadius: '5px', border: '1px solid #ccc' }} />
              <input type="number" placeholder="Giá tiền (VD: 50000)" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={{ padding: '10px', width: '150px', borderRadius: '5px', border: '1px solid #ccc' }} />
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                <option value="Khai vị">Khai vị</option>
                <option value="Món chính">Món chính</option>
                <option value="Đồ uống">Đồ uống</option>
                <option value="Tráng miệng">Tráng miệng</option>
              </select>
              <input type="text" placeholder="Link ảnh (VD: https://...)" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }} />
            </div>
            <button type="submit" style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#e67e22', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>➕ THÊM VÀO MENU</button>
          </form>

          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ marginTop: 0, color: '#27ae60' }}>📋 Các món đang có:</h3>
              <input 
                type="text" placeholder="🔍 Tìm kiếm món ăn..." value={searchMenu} onChange={(e) => setSearchMenu(e.target.value)}
                style={{ padding: '10px', width: '250px', borderRadius: '20px', border: '1px solid #ccc' }}
              />
            </div>

            {filteredMenuItems.length === 0 ? <p>Không tìm thấy món nào.</p> : (
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                {filteredMenuItems.map((mon) => (
                  <li key={mon._id} style={{ padding: '15px', borderBottom: '1px solid #eee', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      <img src={mon.image || 'https://via.placeholder.com/50'} alt={mon.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
                      <div>
                        <span style={{ fontWeight: 'bold', color: '#c0392b' }}>{mon.name}</span> - <span style={{ color: '#2980b9' }}>{Number(mon.price).toLocaleString()} VNĐ</span> <span style={{ color: 'gray', fontSize: '14px', marginLeft: '10px' }}>({mon.category})</span>
                      </div>
                    </div>
                    <div>
                      <button onClick={() => { setEditingId(mon._id); setEditData(mon); }} style={{ padding: '8px 15px', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>✏️ Sửa</button>
                      <button onClick={() => handleDeleteMenu(mon._id)} style={{ padding: '8px 15px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>🗑️ Xóa</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* ==================== TAB QUẢN LÝ SƠ ĐỒ BÀN ==================== */}
      {activeTab === 'tables' && (
        <div>
          <form onSubmit={handleAddTable} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)', marginBottom: '30px', display: 'flex', alignItems: 'center' }}>
            <div style={{ marginRight: '20px' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>Thêm bàn mới</h3>
            </div>
            <input type="text" placeholder="Nhập mã bàn (VD: BAN_06)" required value={newTableId} onChange={e => setNewTableId(e.target.value.toUpperCase().replace(/\s/g, '_'))} style={{ padding: '12px', marginRight: '10px', width: '250px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }} />
            <button type="submit" style={{ padding: '12px 25px', backgroundColor: '#8e44ad', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>➕ TẠO BÀN</button>
          </form>

          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)' }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>📋 Danh sách bàn trong hệ thống: ({tables.length} bàn)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' }}>
              {tables.map(table => (
                <div key={table._id} style={{ padding: '15px', borderRadius: '8px', border: '2px solid #eee', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#2c3e50' }}>{table.tableId}</h4>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: table.status === 'Trống' ? '#27ae60' : '#e74c3c' }}>{table.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* POPUP SỬA MÓN */}
      {editingId && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', width: '400px' }}>
            <h3 style={{ marginTop: 0 }}>✏️ Cập nhật món</h3>
            <input type="text" value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <input type="number" value={editData.price} onChange={e => setEditData({...editData, price: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <select value={editData.category} onChange={e => setEditData({...editData, category: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
              <option value="Khai vị">Khai vị</option>
              <option value="Món chính">Món chính</option>
              <option value="Đồ uống">Đồ uống</option>
              <option value="Tráng miệng">Tráng miệng</option>
            </select>
            <input type="text" placeholder="Link ảnh..." value={editData.image} onChange={e => setEditData({...editData, image: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }} />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setEditingId(null)} style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: 'white', cursor: 'pointer' }}>Hủy</button>
              <button onClick={handleSaveEdit} style={{ padding: '10px 15px', borderRadius: '5px', border: 'none', backgroundColor: '#2ecc71', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>Lưu thay đổi</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default AdminMenu;