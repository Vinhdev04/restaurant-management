import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import styles from './TopBar.module.scss';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

const TopBar = ({ title }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const savedUser = localStorage.getItem('restaurant_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    const socket = io(SOCKET_URL);

    socket.on('NOTIFICATION', (notif) => {
      setNotifications(prev => [notif, ...prev].slice(0, 10));
      setUnreadCount(prev => prev + 1);
      
      // Phát âm thanh thông báo nhẹ
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
      audio.play().catch(e => console.log('Audio play blocked'));
    });

    return () => socket.disconnect();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('restaurant_user');
    window.location.href = '/';
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) setUnreadCount(0);
  };

  const clearNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  return (
    <header className={styles.topBar}>
      <div className={styles.leftSection}>
        <div className={styles.searchContainer}>
          <span className={styles.searchIcon}>🔍</span>
          <input 
            type="text" 
            placeholder="Tìm kiếm mọi thứ..." 
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.actionGroup}>
          <button className={styles.iconBtn} onClick={() => navigate('/')} title="Về trang chủ">
            🏠
          </button>
          
          <div className={styles.notificationWrapper}>
            <button className={styles.iconBtn} onClick={toggleNotifications} title="Thông báo">
              🔔
              {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
            </button>

            {showNotifications && (
              <div className={styles.notificationDropdown}>
                <div className={styles.dropdownHeader}>
                  <h4>🔔 Thông báo mới</h4>
                  <button className={styles.clearBtn} onClick={clearNotifications}>Xóa tất cả</button>
                </div>
                <div className={styles.notificationList}>
                  {notifications.length > 0 ? (
                    notifications.map((n, i) => (
                      <div key={i} className={styles.notificationItem}>
                        <div className={styles.notifIcon}>
                          {n.type === 'NEW_ORDER' ? '🍔' : n.type === 'PAYMENT_REQUEST' ? '💳' : 'ℹ️'}
                        </div>
                        <div className={styles.notifContent}>
                          <span className={styles.notifMsg}>{n.message}</span>
                          <span className={styles.notifTime}>{new Date(n.time).toLocaleTimeString()}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.emptyNotif}>
                      <span className={styles.emptyIcon}>📭</span>
                      <span>Không có thông báo mới</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.divider}></div>
        
        {currentUser && (
          <div className={styles.userContainer} onMouseLeave={() => setShowDropdown(false)}>
            <div className={styles.userMenu} onClick={() => setShowDropdown(!showDropdown)}>
              <div className={styles.avatar}>
                {currentUser.username.charAt(0).toUpperCase()}
              </div>
              <div className={styles.userInfo}>
                <span className={styles.userName}>{currentUser.username}</span>
                <span className={styles.userRole}>{currentUser.role}</span>
              </div>
              <span className={`${styles.dropdownArrow} ${showDropdown ? styles.active : ''}`}>▼</span>
            </div>

            {showDropdown && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownHeader}>
                  <p className={styles.userEmail}>{currentUser.username}@restaurant.com</p>
                </div>
                <div className={styles.dropdownBody}>
                  <button onClick={() => navigate('/')}>
                    <span className={styles.icon}>🏠</span> Trang chủ
                  </button>
                  <button onClick={() => navigate('/admin/settings')}>
                    <span className={styles.icon}>⚙️</span> Cài đặt
                  </button>
                </div>
                <div className={styles.dropdownFooter}>
                  <button onClick={handleLogout} className={styles.logoutBtn}>
                    <span className={styles.icon}>🚪</span> Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default TopBar;
