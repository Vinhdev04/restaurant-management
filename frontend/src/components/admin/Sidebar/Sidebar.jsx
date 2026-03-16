import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Reservations', path: '/admin/reservations', icon: '📅' },
    { name: 'Menu', path: '/admin/menu', icon: '🍴' },
    { name: 'Staff', path: '/admin/staff', icon: '👥' },
    { name: 'Analytics', path: '/admin/analytics', icon: '📈' },
    { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoContainer}>
        <div className={styles.logoIcon}>🛠️</div>
        <div className={styles.logoText}>
          <span className={styles.title}>RestaurantHub</span>
          <span className={styles.subtitle}>Management System</span>
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

      <div className={styles.userProfile}>
        <div className={styles.avatar}>S</div>
        <div className={styles.userInfo}>
          <span className={styles.userName}>saas</span>
          <span className={styles.userRole}>Admin</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
