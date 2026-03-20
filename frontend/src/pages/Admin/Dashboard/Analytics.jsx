import React, { useState, useEffect } from 'react';
import styles from './Analytics.module.scss';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Analytics = () => {
  const [stats, setStats] = useState([
    { title: 'Doanh thu tổng', value: '$0', change: '0%', icon: '💵', color: 'success' },
    { title: 'Tổng đơn hàng', value: '0', change: '0%', icon: '🛍️', color: 'info' },
    { title: 'Thực đơn', value: '0', change: '0%', icon: '🍽️', color: 'warning' },
    { title: 'Đánh giá khách hàng', value: '4.8', change: '+0.2', icon: '⭐', color: 'error' },
  ]);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('restaurant_user');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));

    const fetchStats = async () => {
      try {
        const res = await fetch(`${API_URL}/admin/stats`);
        if (res.ok) {
          const data = await res.json();
          setStats([
            { title: 'Doanh thu tổng', value: `${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(data.totalOrders * 150000)}`, change: '+18.2%', icon: '💵', color: 'success' },
            { title: 'Tổng đơn hàng', value: `${data.totalOrders}`, change: '+12.5%', icon: '🛍️', color: 'info' },
            { title: 'Thực đơn', value: `${data.totalMenu} món`, change: '+5.3%', icon: '🍴', color: 'warning' },
            { title: 'Nhân viên', value: data.totalStaff || '0', change: '+2', icon: '👥', color: 'error' },
          ]);
        }
      } catch (error) {
        console.error("Lỗi tải thống kê:", error);
      }
    };
    fetchStats();
  }, []);

  if (!currentUser) return <div className={styles.loading}>Đang tải...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          {currentUser.role === 'admin' ? 'Bảng điều khiển Admin' : 
           currentUser.role === 'manager' ? 'Bảng điều khiển Quản lý' : 'Báo cáo công việc'}
        </h1>
        <p className={styles.subtitle}>
          Chào mừng, {currentUser.username}! {currentUser.role === 'admin' ? 'Dưới đây là tổng quan toàn bộ hệ thống.' : 'Xem thống kê công việc hôm nay.'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          // Ẩn doanh thu với Chef
          (currentUser.role !== 'chef' || stat.title !== 'Doanh thu tổng') && (
            <div key={index} className={styles.statCard}>
              <div className={styles.statHeader}>
                <div className={`${styles.iconBox} ${styles[stat.color]}`}>{stat.icon}</div>
                <span className={styles.change}>{stat.change}</span>
              </div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statTitle}>{stat.title}</div>
            </div>
          )
        ))}
      </div>

      {/* Phân chia nội dung Dashboard theo Role */}
      <div className={styles.chartsGrid}>
        {currentUser.role === 'admin' ? (
          <>
            {/* Revenue Overview - Chỉ Admin */}
            <div className={styles.chartCard}>
              <h3 className={styles.cardTitle}>Tổng quan doanh thu hệ thống</h3>
              <div className={styles.barChart}>
                {['T1', 'T2', 'T3', 'T4', 'T5', 'T6'].map((month, index) => (
                  <div key={month} className={styles.barRow}>
                    <span className={styles.barLabel}>{month}</span>
                    <div className={styles.barTrack}>
                      <div className={styles.barFill} style={{ width: `${60 + index * 5}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className={styles.chartCard}>
            <h3 className={styles.cardTitle}>Lịch làm việc & Ghi chú</h3>
            <div className={styles.notesList}>
              <div className={styles.noteItem}>🔔 Có 3 bàn mới đặt lúc 19:00 hôm nay.</div>
              <div className={styles.noteItem}>🔔 Kiểm tra tồn kho nguyên liệu buổi sáng.</div>
            </div>
          </div>
        )}

        {/* Top Performing Items - Admin & Manager */}
        {(currentUser.role === 'admin' || currentUser.role === 'manager') && (
          <div className={styles.chartCard}>
            <h3 className={styles.cardTitle}>Món ăn bán chạy</h3>
            <div className={styles.topItemsList}>
              {topItems.map((item) => (
                <div key={item.rank} className={styles.topItem}>
                  <div className={styles.rankBox}>{item.rank}</div>
                  <div className={styles.itemInfo}>
                    <span className={styles.itemName}>{item.name}</span>
                    <span className={styles.itemOrders}>{item.orders}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottomGrid}>
        {/* Customer Satisfaction */}
        <div className={styles.chartCard}>
          <h3 className={styles.cardTitle}>Customer Satisfaction</h3>
          <div className={styles.satisfactionContent}>
            <div className={styles.donutChart}>
              <div className={styles.donutCenter}>
                <span className={styles.donutValue}>92%</span>
                <span className={styles.donutLabel}>Satisfied</span>
              </div>
              <svg viewBox="0 0 36 36" className={styles.circularChart}>
                <path className={styles.circleBg}
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path className={styles.circle}
                  strokeDasharray="92, 100"
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
            </div>
            <div className={styles.ratingList}>
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className={styles.ratingRow}>
                  <span className={styles.starLabel}>{star} Stars</span>
                  <span className={styles.starValue}>{star === 5 ? '68%' : star === 4 ? '24%' : '1%'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Peak Hours */}
        <div className={styles.chartCard}>
          <h3 className={styles.cardTitle}>Peak Hours</h3>
          <div className={styles.peakHoursList}>
            {[
              { time: '12:00 PM - 1:00 PM', bookings: 28 },
              { time: '1:00 PM - 2:00 PM', bookings: 32 },
              { time: '6:00 PM - 7:00 PM', bookings: 38 },
              { time: '7:00 PM - 8:00 PM', bookings: 45 },
              { time: '8:00 PM - 9:00 PM', bookings: 42 },
            ].map((slot, index) => (
              <div key={index} className={styles.peakRow}>
                <span className={styles.peakTime}>{slot.time}</span>
                <div className={styles.peakBarContainer}>
                  <div 
                    className={styles.peakBar} 
                    style={{ width: `${(slot.bookings / 50) * 100}%` }}
                  ></div>
                </div>
                <span className={styles.peakValue}>{slot.bookings} bookings</span>
              </div>
            ))}
          </div>
        </div>

        {/* Table Turnover */}
        <div className={styles.chartCard}>
          <h3 className={styles.cardTitle}>Table Turnover</h3>
          <div className={styles.turnoverList}>
            {[
              { table: 'Table 5', turns: '6 turns today', revenue: '$1,245' },
              { table: 'Table 12', turns: '5 turns today', revenue: '$1,180' },
              { table: 'Table 8', turns: '5 turns today', revenue: '$1,095' },
              { table: 'Table 3', turns: '4 turns today', revenue: '$890' },
              { table: 'Table 15', turns: '4 turns today', revenue: '$865' },
            ].map((item, index) => (
              <div key={index} className={styles.turnoverRow}>
                <div className={styles.turnoverInfo}>
                  <span className={styles.tableName}>{item.table}</span>
                  <span className={styles.turnCount}>{item.turns}</span>
                </div>
                <span className={styles.turnRevenue}>{item.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
