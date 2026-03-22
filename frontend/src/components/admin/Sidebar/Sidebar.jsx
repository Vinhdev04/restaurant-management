import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const [currentUser, setCurrentUser] = React.useState(null);

  React.useEffect(() => {
    const savedUser = localStorage.getItem('restaurant_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
  }, []);

  const menuItems = React.useMemo(() => {
    if (!currentUser) return [];

    const items = [];
    
    // Mọi role (Admin, Manager, Chef) đều có Dashboard/Analytics cơ bản
    items.push({ name: 'Dashboard', path: '/admin/dashboard', icon: '📊' });

    // Phân quyền theo Role
    if (currentUser.role === 'admin' || currentUser.role === 'manager') {
      items.push({ name: 'Đặt bàn', path: '/admin/reservations', icon: '📅' });
      items.push({ name: 'Thực đơn', path: '/admin/menu', icon: '🍴' });
    }

    if (currentUser.role === 'admin') {
      items.push({ name: 'Nhân viên', path: '/admin/staff', icon: '👥' });
      items.push({ name: 'Phân tích', path: '/admin/analytics', icon: '📈' });
    }

    if (currentUser.role === 'chef') {
      items.push({ name: 'Bếp (Chef)', path: '/staff/chef', icon: '👨‍🍳' });
    }

    if (currentUser.role === 'manager') {
      items.push({ name: 'Quản lý bàn', path: '/staff/manager', icon: '📋' });
    }

    items.push({ name: 'Cài đặt', path: '/admin/settings', icon: '⚙️' });
    
    return items;
  }, [currentUser]);

  const handleLogout = () => {
    localStorage.removeItem('restaurant_user');
    window.location.href = '/';
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <div className={styles.logoIcon}>
          <span>RMS</span>
        </div>
        <div className={styles.logoText}>
          <span className={styles.title}>RMS HUB</span>
          <span className={styles.subtitle}>Quản lý nhà hàng</span>
        </div>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {menuItems.map((item) => (
            <li key={item.name} className={styles.navItem}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => 
                  `${styles.navLink} ${isActive ? styles.active : ''}`
                }
              >
                <span className={styles.icon}>{item.icon}</span>
                <span className={styles.text}>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {currentUser && (
        <div className={styles.sidebarFooter}>
          <div className={styles.userProfile}>
            <div className={styles.avatar}>
              {currentUser.username.charAt(0).toUpperCase()}
            </div>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{currentUser.username}</span>
              <span className={styles.userRole}>{currentUser.role}</span>
            </div>
          </div>
          <button onClick={handleLogout} className={styles.logoutBtn}>
            <span className={styles.icon}>🚪</span>
            <span className={styles.text}>Đăng xuất</span>
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
