import React, { useState, useEffect } from 'react';
import styles from './MenuManagement.module.scss';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const MenuManagement = () => {
  const [activeTab, setActiveTab] = useState('All Items');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = ['All Items', 'Khai vị', 'Món chính', 'Tráng miệng', 'Đồ uống'];

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/menu/all`);
      if (res.ok) {
        const data = await res.json();
        setMenuItems(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Lỗi tải menu:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = activeTab === 'All Items' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeTab);

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa món này?")) return;
    try {
      const res = await fetch(`${API_URL}/admin/menu/delete/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchMenuItems();
      }
    } catch (error) {
      alert("Lỗi khi xóa món!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Quản Lý Thực Đơn</h1>
          <p className={styles.subtitle}>Quản lý các món ăn trong nhà hàng của bạn</p>
        </div>
        <button className={styles.addButton}>+ Thêm món mới</button>
      </div>

      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>Đang tải dữ liệu...</div>
      ) : (
        <div className={styles.grid}>
          {filteredItems.map((item) => (
            <div key={item._id} className={styles.card}>
              <div className={styles.imageContainer}>
                <img src={item.image || 'https://via.placeholder.com/150'} alt={item.name} className={styles.image} />
                <span className={`${styles.statusBadge} ${item.isSoldOut ? styles.outOfStock : styles.available}`}>
                  {item.isSoldOut ? 'Hết hàng' : 'Đang bán'}
                </span>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <span className={styles.itemPrice}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</span>
                </div>
                <p className={styles.itemDescription}>{item.description || 'Không có mô tả.'}</p>
                <div className={styles.cardActions}>
                  <button className={styles.editBtn}>✏️ Sửa</button>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(item._id)}>🗑️ Xóa</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
