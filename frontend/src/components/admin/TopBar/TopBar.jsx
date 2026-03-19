import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TopBar.module.scss';

const TopBar = ({ title }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('restaurant_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('restaurant_user');
    window.location.href = '/';
  };

  return (
    <header className={styles.topBar}>
      <div className={styles.searchContainer}>
        <span className={styles.searchIcon}>🔍</span>
        <input 
          type="text" 
          placeholder="Tìm kiếm..." 
          className={styles.searchInput}
        />
      </div>

      <div className={styles.actions}>
        <button className={styles.notificationBtn} onClick={() => navigate('/')} title="Về trang chủ">
          🏠
        </button>
        
        {currentUser && (
          <div className={styles.userMenu} onClick={() => setShowDropdown(!showDropdown)}>
            <div className={styles.avatar}>
              {currentUser.username.charAt(0).toUpperCase()}
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{currentUser.username}</span>
              <span className={styles.userRole}>{currentUser.role}</span>
            </div>
            <span className={styles.dropdownIcon}>▼</span>

            {showDropdown && (
              <div className={styles.dropdownMenu}>
                <button onClick={() => navigate('/')}>Trang chủ</button>
                <button onClick={handleLogout} className={styles.logoutBtn}>Đăng xuất 🚪</button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;
