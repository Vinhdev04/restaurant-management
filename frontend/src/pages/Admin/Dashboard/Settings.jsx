import React, { useState } from 'react';
import styles from './Settings.module.scss';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('General');

  const tabs = ['General', 'Restaurant Info', 'Notifications', 'Security'];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.subtitle}>Manage your restaurant settings and preferences</p>
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

      <div className={styles.content}>
        <div className={styles.sectionTitle}>General Settings</div>
        
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label>Restaurant Name</label>
            <input type="text" defaultValue="The Gourmet Kitchen" />
          </div>

          <div className={styles.formGroup}>
            <label>Time Zone</label>
            <select defaultValue="Eastern Time (ET)">
              <option>Eastern Time (ET)</option>
              <option>Pacific Time (PT)</option>
              <option>Central Time (CT)</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Currency</label>
            <select defaultValue="USD ($)">
              <option>USD ($)</option>
              <option>EUR (€)</option>
              <option>GBP (£)</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Language</label>
            <select defaultValue="English">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </div>

          <button type="submit" className={styles.saveButton}>Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
