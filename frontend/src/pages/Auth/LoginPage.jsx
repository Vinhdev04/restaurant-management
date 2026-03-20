import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './AuthPage.module.scss';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('manager'); // Mặc định là manager
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role })
      });
      const data = await res.json();
      
      if (res.ok) {
        localStorage.setItem('restaurant_user', JSON.stringify(data.user)); 
        window.location.href = data.user.role === 'admin' ? '/admin' : '/staff';
      } else {
        setError(data.message || 'Sai tên đăng nhập hoặc mật khẩu!');
      }
    } catch (err) {
      setError('Lỗi kết nối đến máy chủ!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🍴</span>
          </div>
          <h2>ĐĂNG NHẬP HỆ THỐNG</h2>
          <p>Chọn vai trò và nhập thông tin tài khoản của bạn</p>
        </div>

        <form className={styles.authForm} onSubmit={handleSignIn}>
          {error && <div style={{ color: '#e74c3c', backgroundColor: 'rgba(231, 76, 60, 0.1)', padding: '10px', borderRadius: '5px', marginBottom: '15px', textAlign: 'center', fontSize: '14px' }}>{error}</div>}
          
          <div className={styles.formGroup}>
            <label htmlFor="role">Vai trò của bạn</label>
            <select 
              id="role" 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className={styles.roleSelect}
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '16px', backgroundColor: '#f9f9f9' }}
            >
              <option value="admin">Quản trị viên (Admin)</option>
              <option value="manager">Quản lý (Manager)</option>
              <option value="chef">Đầu bếp (Chef)</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="username">Tên đăng nhập</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập..."
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu..."
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Đang xử lý...' : 'ĐĂNG NHẬP'}
          </button>
          
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <Link to="/" style={{ color: '#7f8c8d', textDecoration: 'none', fontSize: '14px' }}>← Quay lại trang chủ</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
