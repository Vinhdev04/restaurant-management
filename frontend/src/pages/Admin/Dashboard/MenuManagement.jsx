import React, { useState, useEffect } from 'react';
import styles from './MenuManagement.module.scss';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const MenuManagement = () => {
  const [activeTab, setActiveTab] = useState('All Items');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Món chính',
    image: '',
    description: '',
    isSoldOut: false
  });

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

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        price: item.price,
        category: item.category,
        image: item.image || '',
        description: item.description || '',
        isSoldOut: item.isSoldOut || false
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        price: '',
        category: 'Món chính',
        image: '',
        description: '',
        isSoldOut: false
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingItem 
      ? `${API_URL}/admin/menu/edit/${editingItem._id}` 
      : `${API_URL}/admin/menu/add`;
    const method = editingItem ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setShowModal(false);
        fetchMenuItems();
      } else {
        const err = await res.json();
        alert(err.message || "Lỗi khi lưu món ăn!");
      }
    } catch (error) {
      alert("Lỗi kết nối tới máy chủ!");
    }
  };

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

  const filteredItems = activeTab === 'All Items' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeTab);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Quản Lý Thực Đơn</h1>
          <p className={styles.subtitle}>Quản lý các món ăn trong nhà hàng của bạn</p>
        </div>
        <button className={styles.addButton} onClick={() => handleOpenModal()}>+ Thêm món mới</button>
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
        <div className={styles.loadingState}>Đang tải dữ liệu...</div>
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
                  <button className={styles.editBtn} onClick={() => handleOpenModal(item)}>✏️ Sửa</button>
                  <button className={styles.deleteBtn} onClick={() => handleDelete(item._id)}>🗑️ Xóa</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{editingItem ? 'Sửa món ăn' : 'Thêm món ăn mới'}</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Tên món</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Giá (VNĐ)</label>
                <input 
                  type="number" 
                  value={formData.price} 
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Danh mục</label>
                <select 
                  value={formData.category} 
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Khai vị">Khai vị</option>
                  <option value="Món chính">Món chính</option>
                  <option value="Tráng miệng">Tráng miệng</option>
                  <option value="Đồ uống">Đồ uống</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label>Link ảnh</label>
                <input 
                  type="text" 
                  value={formData.image} 
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                />
              </div>
              <div className={styles.formGroup}>
                <label>Mô tả</label>
                <textarea 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className={styles.checkboxGroup}>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.isSoldOut} 
                    onChange={(e) => setFormData({...formData, isSoldOut: e.target.checked})}
                  />
                  Hết hàng
                </label>
              </div>
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowModal(false)} className={styles.cancelBtn}>Hủy</button>
                <button type="submit" className={styles.submitBtn}>Lưu lại</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
