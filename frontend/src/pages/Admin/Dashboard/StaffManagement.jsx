import React, { useState, useEffect } from 'react';
import styles from './StaffManagement.module.scss';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const StaffManagement = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'manager'
  });

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/staff/all`);
      if (res.ok) {
        const data = await res.json();
        setStaff(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error("Lỗi tải danh sách nhân viên:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingStaff(item);
      setFormData({
        username: item.username,
        password: '', // Không hiển thị mật khẩu cũ
        role: item.role
      });
    } else {
      setEditingStaff(null);
      setFormData({
        username: '',
        password: '',
        role: 'manager'
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingStaff 
      ? `${API_URL}/admin/staff/edit/${editingStaff._id}` 
      : `${API_URL}/admin/staff/add`;
    const method = editingStaff ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setShowModal(false);
        fetchStaff();
      } else {
        const err = await res.json();
        alert(err.message || "Lỗi khi lưu thông tin nhân viên!");
      }
    } catch (error) {
      alert("Lỗi kết nối tới máy chủ!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) return;
    try {
      const res = await fetch(`${API_URL}/admin/staff/delete/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchStaff();
      }
    } catch (error) {
      alert("Lỗi khi xóa nhân viên!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Quản Lý Nhân Viên</h1>
          <p className={styles.subtitle}>Quản lý tài khoản và quyền hạn của nhân viên</p>
        </div>
        <button className={styles.addButton} onClick={() => handleOpenModal()}>+ Thêm nhân viên</button>
      </div>

      {loading ? (
        <div className={styles.loadingState}>Đang tải dữ liệu...</div>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Tên đăng nhập</th>
                <th>Vai trò</th>
                <th>Ngày tạo</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {staff.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className={styles.userInfo}>
                      <div className={styles.avatar}>
                        {item.username.charAt(0).toUpperCase()}
                      </div>
                      <span className={styles.username}>{item.username}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.roleBadge} ${styles[item.role]}`}>
                      {item.role === 'manager' ? 'Quản lý' : 'Đầu bếp'}
                    </span>
                  </td>
                  <td>{new Date(item.createdAt || Date.now()).toLocaleDateString('vi-VN')}</td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.editBtn} onClick={() => handleOpenModal(item)}>✏️ Sửa</button>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(item._id)}>🗑️ Xóa</button>
                    </div>
                  </td>
                </tr>
              ))}
              {staff.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                    Chưa có nhân viên nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>{editingStaff ? 'Sửa thông tin nhân viên' : 'Thêm nhân viên mới'}</h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Tên đăng nhập</label>
                <input 
                  type="text" 
                  value={formData.username} 
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required 
                  disabled={!!editingStaff}
                />
              </div>
              <div className={styles.formGroup}>
                <label>{editingStaff ? 'Mật khẩu mới (để trống nếu không đổi)' : 'Mật khẩu'}</label>
                <input 
                  type="password" 
                  value={formData.password} 
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required={!editingStaff} 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Vai trò</label>
                <select 
                  value={formData.role} 
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="manager">Quản lý (Manager)</option>
                  <option value="chef">Đầu bếp (Chef)</option>
                </select>
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

export default StaffManagement;
