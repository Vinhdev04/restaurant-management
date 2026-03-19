import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Manager({ socket }) {
  const [activeTab, setActiveTab] = useState('tables');
  const [tables, setTables] = useState([]);
  const [pendingPayments, setPendingPayments] = useState([]);

  const [showMergeModal, setShowMergeModal] = useState(false);
  const [mergeTable1, setMergeTable1] = useState('');
  const [mergeTable2, setMergeTable2] = useState('');

  const fetchTables = async () => {
    try {
      const res = await fetch(`${API_URL}/manager/tables`);
      if (res.ok) setTables(await res.json());
    } catch (error) { console.log("Lỗi tải danh sách bàn"); }
  };

  const fetchPending = async () => {
    try {
      const res = await fetch(`${API_URL}/manager/payments/pending`);
      if (res.ok) setPendingPayments(await res.json());
    } catch (error) { console.log("Lỗi tải danh sách đơn"); }
  };

  useEffect(() => {
    fetchTables();
    fetchPending();

    socket.on('PAYMENT_REQUESTED', () => fetchPending());
    socket.on('NEW_ORDER_RECEIVED', () => fetchTables()); 
    socket.on('PAYMENT_CONFIRMED', () => { fetchPending(); fetchTables(); });

    return () => {
      socket.off('PAYMENT_REQUESTED');
      socket.off('NEW_ORDER_RECEIVED');
      socket.off('PAYMENT_CONFIRMED');
    };
  }, [socket]);

  const handleOpenTable = async (tableId) => {
    try {
      const res = await fetch(`${API_URL}/manager/table/open`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableId })
      });
      const data = await res.json();
      if (res.ok) {
        alert(`✅ MỞ BÀN THÀNH CÔNG!\n\nBàn: ${data.tableId}\nMã PIN: ${data.unlockCode}`);
        fetchTables(); 
      } else { alert(data.message); }
    } catch (error) { alert("Lỗi kết nối khi mở bàn!"); }
  };

  const handleConfirmPayment = async (orderId, paymentMethod) => {
    try {
      const res = await fetch(`${API_URL}/manager/payments/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, paymentMethod })
      });
      if (res.ok) {
        alert("✅ Đã xác nhận thanh toán!");
        fetchPending();
        fetchTables(); 
      } else { alert("Không xác nhận được thanh toán."); }
    } catch (error) { alert("Lỗi kết nối khi xác nhận thanh toán!"); }
  };

  const handleMergeEmptyTables = async () => {
    if (!mergeTable1 || !mergeTable2 || mergeTable1 === mergeTable2) return alert("Vui lòng chọn 2 bàn khác nhau!");
    try {
      const res = await fetch(`${API_URL}/manager/table/merge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table1: mergeTable1, table2: mergeTable2 })
      });
      const data = await res.json();
      if (res.ok) {
        alert(`✅ ${data.message}\n\nMã PIN của bàn mới: ${data.unlockCode}`);
        setShowMergeModal(false);
        fetchTables();
      } else { alert(data.message); }
    } catch (error) { alert("Lỗi kết nối ghép bàn!"); }
  };

  const handleUnmergeTable = async (tableId) => {
    if(!window.confirm(`Bạn có chắc muốn tách bàn [${tableId}] về lại trạng thái ban đầu?`)) return;
    try {
      const res = await fetch(`${API_URL}/manager/table/unmerge`, {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, 
        body: JSON.stringify({ tableId })
      });
      if(res.ok) {
        alert("Đã tách bàn thành công!");
        fetchTables();
      }
    } catch (error) { alert("Lỗi kết nối khi tách bàn!"); }
  };

  const emptyTables = tables.filter(t => t.status === 'Trống');

  return (
    <div style={{ padding: '30px', backgroundColor: '#f5f6fa', minHeight: '100vh', fontFamily: 'Arial' }}>
      <div style={{ marginBottom: '20px', borderBottom: '2px solid #ddd', paddingBottom: '10px', display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <button onClick={() => setActiveTab('tables')} style={{ padding: '10px 20px', marginRight: '10px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', border: 'none', borderRadius: '5px', backgroundColor: activeTab === 'tables' ? '#3498db' : '#ecf0f1', color: activeTab === 'tables' ? 'white' : '#333' }}>🗺️ Sơ đồ bàn</button>
          <button onClick={() => setActiveTab('payments')} style={{ padding: '10px 20px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', border: 'none', borderRadius: '5px', backgroundColor: activeTab === 'payments' ? '#e67e22' : '#ecf0f1', color: activeTab === 'payments' ? 'white' : '#333' }}>🧾 Chờ thanh toán ({pendingPayments.length})</button>
        </div>
        {activeTab === 'tables' && (
          <button onClick={() => setShowMergeModal(true)} style={{ padding: '10px 20px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', border: 'none', borderRadius: '5px', backgroundColor: '#8e44ad', color: 'white' }}>
            🔗 Ghép 2 bàn trống
          </button>
        )}
      </div>

      {/* ===================== TAB SƠ ĐỒ BÀN ===================== */}
      {activeTab === 'tables' && (
        <div>
          <h2 style={{ marginTop: 0, color: '#2c3e50' }}>🗺️ Sơ đồ bàn hiện tại</h2>
          {tables.length === 0 ? <p>Chưa có dữ liệu bàn.</p> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
              {tables.map(table => (
                <div key={table._id} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '10px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderTop: `5px solid ${table.status === 'Trống' ? '#2ecc71' : table.status === 'Đang phục vụ' ? '#3498db' : '#e74c3c'}` }}>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>{table.tableId}</h3>
                  <p style={{ fontWeight: 'bold', color: table.status === 'Trống' ? '#27ae60' : '#7f8c8d' }}>{table.status}</p>
                  
                  {table.status === 'Trống' && (
                    <>
                      <button onClick={() => handleOpenTable(table.tableId)} style={{ padding: '10px 15px', backgroundColor: '#2ecc71', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', width: '100%', marginBottom: table.tableId.includes(' & ') ? '10px' : '0' }}>🔓 MỞ BÀN</button>
                      
                      {table.tableId.includes(' & ') && (
                        <button onClick={() => handleUnmergeTable(table.tableId)} style={{ padding: '8px 15px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', width: '100%' }}>✂️ Tách bàn</button>
                      )}
                    </>
                  )}

                  {table.status === 'Đang phục vụ' && (
                    <div style={{ backgroundColor: '#ecf0f1', padding: '10px', borderRadius: '5px', fontSize: '14px', marginBottom: '10px' }}>
                      PIN: <strong style={{ letterSpacing: '2px', fontSize: '18px' }}>{table.unlockCode}</strong>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ===================== TAB QUẢN LÝ THANH TOÁN ===================== */}
      {activeTab === 'payments' && (
        <div>
           <h2 style={{ marginTop: 0, color: '#2c3e50' }}>🧾 Quản lý duyệt thanh toán</h2>
           {pendingPayments.length === 0 ? <p>Hiện không có đơn nào chờ thanh toán.</p> : (
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '20px' }}>
              {Object.values(pendingPayments.reduce((acc, order) => {
                const key = order.tableId;
                if (!acc[key]) acc[key] = { tableId: order.tableId, orders: [], totalAmount: 0, baseOrderId: order._id };
                acc[key].orders.push(order);
                acc[key].totalAmount += order.totalAmount || 0;
                return acc;
              }, {})).map(group => (
                <div key={group.tableId} style={{ backgroundColor: 'white', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', position: 'relative' }}>
                  
                  {/* NHÃN HIỂN THỊ PHƯƠNG THỨC KHÁCH ĐÃ CHỌN (TIỀN MẶT HAY CHUYỂN KHOẢN) */}
                  <div style={{ position: 'absolute', top: '15px', right: '15px', padding: '5px 10px', borderRadius: '5px', fontSize: '12px', fontWeight: 'bold', color: 'white', backgroundColor: group.orders[0]?.paymentMethod === 'BANK_TRANSFER' ? '#2980b9' : '#27ae60' }}>
                    {group.orders[0]?.paymentMethod === 'BANK_TRANSFER' ? '💳 Khách chuyển khoản' : '💵 Khách trả tiền mặt'}
                  </div>

                  <h3 style={{ marginTop: 0, borderBottom: '2px solid #ecf0f1', paddingBottom: '10px', color: '#2c3e50' }}>Bàn: {group.tableId}</h3>
                  {group.orders.map(order => (
                    <div key={order._id} style={{ marginBottom: '15px', borderBottom: '1px dashed #ecf0f1', paddingBottom: '10px' }}>
                      <p style={{ margin: '0 0 8px 0', fontSize: '12px', color: '#95a5a6' }}>Mã đơn: {order._id.slice(-6)}</p>
                      <ul style={{ paddingLeft: '0', listStyleType: 'none', margin: '0', fontSize: '14px' }}>
                        {order.items.map((item, idx) => (
                          <li key={idx} style={{ textDecoration: item.status === 'Hết món' ? 'line-through' : 'none', color: item.status === 'Hết món' ? '#e74c3c' : 'inherit', marginBottom: '6px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span>{item.quantity}x {item.menuItemId} {item.status === 'Hết món' && <span style={{fontSize:'12px'}}><br/>(Hết)</span>}</span>
                              <span style={{ fontWeight: 'bold' }}>{(item.price * item.quantity).toLocaleString()} đ</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <p style={{ fontWeight: 'bold', color: '#c0392b', fontSize: '20px', textAlign: 'right', marginTop: '15px' }}>Tổng gộp: {(group.totalAmount || 0).toLocaleString()} đ</p>
                  
                  {/* NÚT BẤM XÁC NHẬN - SẼ LÀM MỜ NÚT MÀ KHÁCH KHÔNG CHỌN */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '15px' }}>
                    <button 
                      onClick={() => handleConfirmPayment(group.baseOrderId, 'CASH')} 
                      style={{ padding: '12px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: '#27ae60', color: 'white', fontWeight: 'bold', fontSize: '15px', opacity: group.orders[0]?.paymentMethod === 'BANK_TRANSFER' ? 0.4 : 1 }}
                    >
                      ✅ Xác nhận đã thu TIỀN MẶT
                    </button>
                    <button 
                      onClick={() => handleConfirmPayment(group.baseOrderId, 'BANK_TRANSFER')} 
                      style={{ padding: '12px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: '#2980b9', color: 'white', fontWeight: 'bold', fontSize: '15px', opacity: group.orders[0]?.paymentMethod === 'CASH' ? 0.4 : 1 }}
                    >
                      ✅ Xác nhận đã nhận CHUYỂN KHOẢN
                    </button>
                  </div>

                </div>
              ))}
             </div>
           )}
        </div>
      )}

      {/* ===================== POPUP GHÉP BÀN ===================== */}
      {showMergeModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', width: '400px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
            <h3 style={{ marginTop: 0, color: '#2c3e50' }}>🔗 Ghép 2 Bàn Trống</h3>
            <div style={{ margin: '20px 0' }}>
              <select value={mergeTable1} onChange={e => setMergeTable1(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px', marginBottom: '15px' }}>
                <option value="">-- Chọn bàn thứ 1 --</option>
                {emptyTables.map(t => <option key={t._id} value={t.tableId}>{t.tableId}</option>)}
              </select>
              <select value={mergeTable2} onChange={e => setMergeTable2(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '16px' }}>
                <option value="">-- Chọn bàn thứ 2 --</option>
                {emptyTables.filter(t => t.tableId !== mergeTable1).map(t => <option key={t._id} value={t.tableId}>{t.tableId}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setShowMergeModal(false)} style={{ padding: '10px 15px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: 'white', cursor: 'pointer' }}>Hủy</button>
              <button onClick={handleMergeEmptyTables} style={{ padding: '10px 15px', borderRadius: '5px', border: 'none', backgroundColor: '#8e44ad', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>Tạo bàn chung</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Manager;