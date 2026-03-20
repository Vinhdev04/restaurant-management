import React, { useState, useEffect } from 'react';
import styles from './Reservations.module.scss';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Reservations = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/reservation/all`);
      if (res.ok) {
        const data = await res.json();
        setReservations(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Lỗi tải danh sách đặt bàn:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/reservation/update-status/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) fetchReservations();
    } catch (error) {
      alert("Lỗi cập nhật trạng thái!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa yêu cầu này?")) return;
    try {
      const res = await fetch(`${API_URL}/reservation/delete/${id}`, { method: 'DELETE' });
      if (res.ok) fetchReservations();
    } catch (error) {
      alert("Lỗi xóa đặt bàn!");
    }
  };

  const filteredReservations = activeTab === 'All'
    ? reservations
    : reservations.filter(res => res.status === activeTab);

  const tabs = [
    { name: 'All', count: reservations.length },
    { name: 'Pending', count: reservations.filter(r => r.status === 'Pending').length },
    { name: 'Confirmed', count: reservations.filter(r => r.status === 'Confirmed').length },
    { name: 'Completed', count: reservations.filter(r => r.status === 'Completed').length },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Quản Lý Đặt Bàn</h1>
          <p className={styles.subtitle}>Quản lý tất cả yêu cầu đặt bàn từ khách hàng</p>
        </div>
      </div>

      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`${styles.tab} ${activeTab === tab.name ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name === 'All' ? 'Tất cả' : 
             tab.name === 'Pending' ? 'Đang chờ' :
             tab.name === 'Confirmed' ? 'Đã xác nhận' : 'Hoàn thành'} 
            <span className={styles.count}>({tab.count})</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className={styles.loadingState}>Đang tải dữ liệu...</div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Khách hàng</th>
                <th>Liên hệ</th>
                <th>Ngày & Giờ</th>
                <th>Số khách</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map((res) => (
                <tr key={res._id}>
                  <td>
                    <div className={styles.guestInfo}>
                      <span className={styles.guestName}>{res.guestName}</span>
                      <span className={styles.notes}>{res.notes}</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.contactInfo}>
                      <span>📞 {res.phone}</span>
                      <span>📧 {res.email}</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.dateTime}>
                      <span className={styles.date}>{res.date}</span>
                      <span className={styles.time}>{res.time}</span>
                    </div>
                  </td>
                  <td><span className={styles.guestCount}>{res.guests} người</span></td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[res.status.toLowerCase()]}`}>
                      {res.status === 'Pending' ? 'Đang chờ' :
                       res.status === 'Confirmed' ? 'Đã xác nhận' :
                       res.status === 'Completed' ? 'Hoàn thành' : 'Đã hủy'}
                    </span>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      {res.status === 'Pending' && (
                        <button 
                          className={styles.confirmBtn} 
                          onClick={() => handleUpdateStatus(res._id, 'Confirmed')}
                        >
                          Xác nhận
                        </button>
                      )}
                      {res.status === 'Confirmed' && (
                        <button 
                          className={styles.completeBtn} 
                          onClick={() => handleUpdateStatus(res._id, 'Completed')}
                        >
                          Hoàn thành
                        </button>
                      )}
                      <button className={styles.deleteBtn} onClick={() => handleDelete(res._id)}>🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredReservations.length === 0 && (
                <tr>
                  <td colSpan="6" className={styles.emptyRow}>Không tìm thấy yêu cầu đặt bàn nào.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reservations;
