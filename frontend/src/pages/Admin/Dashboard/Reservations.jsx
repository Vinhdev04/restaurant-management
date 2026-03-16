import React, { useState } from 'react';
import styles from './Reservations.module.scss';

const Reservations = () => {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = [
    { name: 'All', count: 10 },
    { name: 'Confirmed', count: 5 },
    { name: 'Pending', count: 3 },
    { name: 'Completed', count: 2 },
  ];

  const reservations = [
    { id: 1, guest: 'Sarah Johnson', phone: '+1 234-567-8901', date: 'Dec 28, 2024', time: '7:30 PM', table: 'Table 5', guests: 4, status: 'Confirmed' },
    { id: 2, guest: 'Michael Chen', phone: '+1 234-567-8902', date: 'Dec 28, 2024', time: '8:00 PM', table: 'Table 12', guests: 2, status: 'Pending' },
    { id: 3, guest: 'Emily Rodriguez', phone: '+1 234-567-8903', date: 'Dec 28, 2024', time: '6:45 PM', table: 'Table 8', guests: 6, status: 'Confirmed' },
    { id: 4, guest: 'David Thompson', phone: '+1 234-567-8904', date: 'Dec 29, 2024', time: '7:15 PM', table: 'Table 3', guests: 3, status: 'Confirmed' },
    { id: 5, guest: 'Lisa Anderson', phone: '+1 234-567-8905', date: 'Dec 29, 2024', time: '8:30 PM', table: 'Table 15', guests: 5, status: 'Pending' },
    { id: 6, guest: 'Robert Martinez', phone: '+1 234-567-8906', date: 'Dec 27, 2024', time: '7:00 PM', table: 'Table 7', guests: 4, status: 'Completed' },
    { id: 7, guest: 'Jennifer Lee', phone: '+1 234-567-8907', date: 'Dec 27, 2024', time: '8:15 PM', table: 'Table 10', guests: 2, status: 'Completed' },
    { id: 8, guest: 'William Brown', phone: '+1 234-567-8908', date: 'Dec 30, 2024', time: '6:30 PM', table: 'Table 4', guests: 8, status: 'Confirmed' },
    { id: 9, guest: 'Amanda Wilson', phone: '+1 234-567-8909', date: 'Dec 30, 2024', time: '7:45 PM', table: 'Table 11', guests: 3, status: 'Pending' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Reservations</h1>
          <p className={styles.subtitle}>Manage all restaurant reservations</p>
        </div>
        <button className={styles.addButton}>+ New Reservation</button>
      </div>

      <div className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab.name}
            className={`${styles.tab} ${activeTab === tab.name ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name} <span className={styles.count}>({tab.count})</span>
          </button>
        ))}
      </div>

      <div className={styles.searchBar}>
        <span className={styles.searchIcon}>🔍</span>
        <input type="text" placeholder="Search reservations..." className={styles.searchInput} />
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Guest</th>
              <th>Date</th>
              <th>Time</th>
              <th>Table</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res) => (
              <tr key={res.id}>
                <td>
                  <div className={styles.guestInfo}>
                    <span className={styles.guestName}>{res.guest}</span>
                    <span className={styles.guestPhone}>{res.phone}</span>
                  </div>
                </td>
                <td>{res.date}</td>
                <td>{res.time}</td>
                <td>{res.table}</td>
                <td>{res.guests}</td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[res.status.toLowerCase()]}`}>
                    {res.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.actionBtn}>✏️</button>
                    <button className={styles.actionBtn}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservations;
