import React from 'react';
import styles from './TopBar.module.scss';

const TopBar = ({ title }) => {
  return (
    <header className={styles.topBar}>
      <div className={styles.searchContainer}>
        <span className={styles.searchIcon}>🔍</span>
        <input 
          type="text" 
          placeholder="Search..." 
          className={styles.searchInput}
        />
      </div>

      <div className={styles.actions}>
        <button className={styles.notificationBtn}>
          🔔
          <span className={styles.badge}>3</span>
        </button>
        
        <div className={styles.userMenu}>
          <div className={styles.avatar}>S</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>saas</span>
            <span className={styles.userRole}>Admin</span>
          </div>
          <span className={styles.dropdownIcon}>▼</span>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
