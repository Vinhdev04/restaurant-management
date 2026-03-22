import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import styles from './Manager.module.scss';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000/api';

function Manager({ socket }) {
  const [activeTab, setActiveTab] = useState('tables');
  const [tables, setTables] = useState([]);
  const [pendingPayments, setPendingPayments] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  const [showMergeModal, setShowMergeModal] = useState(false);
  const [mergeTable1, setMergeTable1] = useState('');
  const [mergeTable2, setMergeTable2] = useState('');

  const fetchMenu = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/menu/all`);
      if (res.ok) {
        const data = await res.json();
        setMenuItems(data);
      }
    } catch (error) { console.log("Lỗi tải thực đơn"); }
  };

  const fetchTables = async () => {
    try {
      const res = await fetch(`${API_URL}/manager/tables`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setTables(data);
        } else {
          setTables([]);
        }
      }
    } catch (error) { console.log("Lỗi tải danh sách bàn"); }
  };

  const fetchPending = async () => {
    try {
      const res = await fetch(`${API_URL}/manager/payments/pending`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setPendingPayments(data);
        } else {
          setPendingPayments([]);
        }
      }
    } catch (error) { console.log("Lỗi tải danh sách đơn"); }
  };

  useEffect(() => {
    fetchTables();
    fetchPending();
    fetchMenu();

    if (socket) {
      socket.on('PAYMENT_REQUESTED', () => fetchPending());
      socket.on('NEW_ORDER_RECEIVED', () => fetchTables()); 
      socket.on('PAYMENT_CONFIRMED', () => { fetchPending(); fetchTables(); });
      socket.on('MENU_ITEM_UPDATED', () => fetchMenu());
      socket.on('MENU_RESET_SUCCESS', () => fetchMenu());
      socket.on('MENU_ITEM_ADDED', () => fetchMenu());

      return () => {
        socket.off('PAYMENT_REQUESTED');
        socket.off('NEW_ORDER_RECEIVED');
        socket.off('PAYMENT_CONFIRMED');
        socket.off('MENU_ITEM_UPDATED');
        socket.off('MENU_RESET_SUCCESS');
        socket.off('MENU_ITEM_ADDED');
      };
    }
  }, [socket]);

  const handleToggleSoldOut = async (id, currentStatus) => {
    try {
      const res = await fetch(`${API_URL}/manager/menu/toggle-sold-out`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isSoldOut: !currentStatus })
      });
      if (res.ok) {
        fetchMenu();
      }
    } catch (error) {
      Swal.fire('Lỗi!', 'Không thể cập nhật trạng thái món.', 'error');
    }
  };

  const handleResetMenu = async () => {
    const result = await Swal.fire({
      title: 'Reset trạng thái món?',
      text: "Tất cả các món sẽ được đặt về trạng thái CÒN HÀNG.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}/manager/menu/reset-all`, { method: 'POST' });
        if (res.ok) {
          Swal.fire('Thành công!', 'Đã reset toàn bộ thực đơn.', 'success');
          fetchMenu();
        }
      } catch (error) {
        Swal.fire('Lỗi!', 'Không thể reset thực đơn.', 'error');
      }
    }
  };

  const handleOpenTable = async (tableId) => {
    try {
      const res = await fetch(`${API_URL}/manager/table/open`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tableId })
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          title: 'Mở bàn thành công!',
          html: `
            <div style="text-align: center;">
              <p style="font-size: 18px;">Bàn: <strong>${data.tableId}</strong></p>
              <p style="font-size: 24px; color: #14b8a6; font-weight: 800; letter-spacing: 4px;">PIN: ${data.pin}</p>
              <p style="font-size: 14px; color: #64748b;">Hãy cung cấp mã này cho khách hàng</p>
            </div>
          `,
          icon: 'success',
          confirmButtonColor: '#14b8a6',
          confirmButtonText: 'Đã rõ'
        });
        fetchTables(); 
      } else { 
        Swal.fire('Lỗi!', data.message, 'error');
      }
    } catch (error) { 
      Swal.fire('Lỗi!', 'Không thể kết nối tới máy chủ', 'error');
    }
  };

  const handleConfirmPayment = async (orderId, paymentMethod) => {
    const result = await Swal.fire({
      title: 'Xác nhận thanh toán?',
      text: "Hành động này sẽ giải phóng bàn và cập nhật doanh thu.",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#14b8a6',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Đúng, xác nhận!',
      cancelButtonText: 'Hủy'
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}/manager/payments/confirm`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ orderId, paymentMethod })
        });
        if (res.ok) {
          Swal.fire('Thành công!', 'Đã xác nhận thanh toán.', 'success');
          fetchPending();
          fetchTables(); 
        } else { 
          Swal.fire('Lỗi!', 'Không thể xác nhận thanh toán.', 'error');
        }
      } catch (error) { 
        Swal.fire('Lỗi!', 'Không thể kết nối tới máy chủ', 'error');
      }
    }
  };

  const handleMergeEmptyTables = async () => {
    if (!mergeTable1 || !mergeTable2 || mergeTable1 === mergeTable2) {
      return Swal.fire('Cảnh báo!', 'Vui lòng chọn 2 bàn khác nhau!', 'warning');
    }
    try {
      const res = await fetch(`${API_URL}/manager/table/merge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table1: mergeTable1, table2: mergeTable2 })
      });
      const data = await res.json();
      if (res.ok) {
        Swal.fire('Thành công!', data.message, 'success');
        setShowMergeModal(false);
        fetchTables();
      } else { 
        Swal.fire('Lỗi!', data.message, 'error');
      }
    } catch (error) { 
      Swal.fire('Lỗi!', 'Không thể thực hiện ghép bàn', 'error');
    }
  };

  const handleUnmergeTable = async (tableId) => {
    const result = await Swal.fire({
      title: 'Xác nhận tách bàn?',
      text: `Bạn có muốn tách bàn [${tableId}] về trạng thái ban đầu?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Đúng, tách bàn!',
      cancelButtonText: 'Hủy'
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}/manager/table/unmerge`, {
          method: 'POST', 
          headers: { 'Content-Type': 'application/json' }, 
          body: JSON.stringify({ tableId })
        });
        if(res.ok) {
          Swal.fire('Đã tách!', 'Bàn đã được tách thành công.', 'success');
          fetchTables();
        }
      } catch (error) { 
        Swal.fire('Lỗi!', 'Không thể thực hiện tách bàn', 'error');
      }
    }
  };

  const emptyTables = tables.filter(t => t.status === 'Trống');

  return (
    <div className={styles.managerContainer}>
      <div className={styles.topNav}>
        <div className={styles.tabGroup}>
          <button 
            onClick={() => setActiveTab('tables')} 
            className={`${styles.tabBtn} ${activeTab === 'tables' ? styles.active : ''}`}
          >
            🗺️ Sơ đồ bàn
          </button>
          <button 
            onClick={() => setActiveTab('payments')} 
            className={`${styles.tabBtn} ${activeTab === 'payments' ? styles.active : ''}`}
          >
            🧾 Chờ thanh toán 
            {pendingPayments.length > 0 && <span className={styles.badge}>{pendingPayments.length}</span>}
          </button>
          <button 
            onClick={() => setActiveTab('menu')} 
            className={`${styles.tabBtn} ${activeTab === 'menu' ? styles.active : ''}`}
          >
            🍴 Quản lý món
          </button>
        </div>
        
        {activeTab === 'tables' && (
          <button onClick={() => setShowMergeModal(true)} className={styles.mergeBtn}>
            🔗 Ghép 2 bàn trống
          </button>
        )}

        {activeTab === 'menu' && (
          <button onClick={handleResetMenu} className={styles.resetBtn}>
            🔄 Reset Thực Đơn
          </button>
        )}
      </div>

      <div className={styles.content}>
        {activeTab === 'tables' && (
          <div className={styles.tableGrid}>
            {tables.map(table => (
              <div 
                key={table._id} 
                className={`${styles.tableCard} ${styles[table.status.replace(/\s+/g, '')]}`}
              >
                <h3>Bàn {table.tableId}</h3>
                <p className={styles.status}>{table.status}</p>
                {table.pin && <p className={styles.pin}>PIN: {table.pin}</p>}
                
                <div className={styles.actions}>
                  {table.status === 'Trống' && (
                    <button onClick={() => handleOpenTable(table.tableId)}>Mở bàn</button>
                  )}
                  {table.status === 'Đang dùng' && (
                    <button className={styles.unmerge} onClick={() => handleUnmergeTable(table.tableId)}>Hủy bàn</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'payments' && (
          <div className={styles.paymentList}>
            {pendingPayments.length === 0 ? (
              <p className={styles.empty}>Không có yêu cầu thanh toán nào.</p>
            ) : (
              pendingPayments.map(order => (
                <div key={order._id} className={styles.paymentCard}>
                  <div className={styles.orderInfo}>
                    <h3>Bàn {order.tableId}</h3>
                    <p>Tổng: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}</p>
                    <p>Phương thức: {order.paymentMethod === 'BANK_TRANSFER' ? 'Chuyển khoản' : 'Tiền mặt'}</p>
                  </div>
                  <button onClick={() => handleConfirmPayment(order._id, order.paymentMethod)}>Xác nhận</button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'menu' && (
          <div className={styles.menuGrid}>
            {menuItems.map(item => (
              <div key={item._id} className={`${styles.menuCard} ${item.isSoldOut ? styles.soldOut : ''}`}>
                <img src={item.image} alt={item.name} />
                <div className={styles.menuInfo}>
                  <h4>{item.name}</h4>
                  <p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</p>
                  <button 
                    onClick={() => handleToggleSoldOut(item._id, item.isSoldOut)}
                    className={item.isSoldOut ? styles.availableBtn : styles.soldOutBtn}
                  >
                    {item.isSoldOut ? 'Hết hàng' : 'Còn hàng'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ===================== MODAL GHÉP BÀN ===================== */}
      {showMergeModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>🔗 Ghép 2 Bàn Trống</h3>
            <div className={styles.formBody}>
              <div className={styles.formGroup}>
                <label>Bàn thứ nhất</label>
                <select value={mergeTable1} onChange={e => setMergeTable1(e.target.value)}>
                  <option value="">-- Chọn bàn --</option>
                  {emptyTables.map(t => <option key={t._id} value={t.tableId}>{t.tableId}</option>)}
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Bàn thứ hai</label>
                <select value={mergeTable2} onChange={e => setMergeTable2(e.target.value)}>
                  <option value="">-- Chọn bàn --</option>
                  {emptyTables.filter(t => t.tableId !== mergeTable1).map(t => <option key={t._id} value={t.tableId}>{t.tableId}</option>)}
                </select>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button onClick={() => setShowMergeModal(false)} className={styles.cancelBtn}>Hủy</button>
              <button onClick={handleMergeEmptyTables} className={styles.confirmBtn}>Ghép bàn ngay</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Manager;