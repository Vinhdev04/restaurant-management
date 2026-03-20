import React, { useState, useEffect } from 'react';
import styles from './Analytics.module.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Analytics = () => {
  const [stats, setStats] = useState([
    { title: 'Doanh thu tổng', value: '$0', change: '0%', icon: '💵', color: 'success' },
    { title: 'Tổng đơn hàng', value: '0', change: '0%', icon: '🛍️', color: 'info' },
    { title: 'Thực đơn', value: '0', change: '0%', icon: '🍴', color: 'warning' },
    { title: 'Nhân viên', value: '0', change: '0%', icon: '👥', color: 'error' },
  ]);

  const [currentUser, setCurrentUser] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [pieData, setPieData] = useState(null);

  const topItems = [
    { rank: 1, name: 'Bò Lúc Lắc', orders: '342 đơn' },
    { rank: 2, name: 'Cá Hồi Áp Chảo', orders: '298 đơn' },
    { rank: 3, name: 'Súp Hải Sản', orders: '256 đơn' },
    { rank: 4, name: 'Gà Quay Lu', orders: '412 đơn' },
    { rank: 5, name: 'Chè Khúc Bạch', orders: '287 đơn' },
  ];

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

          // Cập nhật dữ liệu biểu đồ Bar
          setChartData({
            labels: data.revenueByMonth.map(item => item.month),
            datasets: [
              {
                label: 'Doanh thu (triệu VNĐ)',
                data: data.revenueByMonth.map(item => item.amount),
                backgroundColor: 'rgba(20, 184, 166, 0.8)',
                borderRadius: 8,
              },
            ],
          });

          // Cập nhật dữ liệu biểu đồ Pie (Doughnut)
          setPieData({
            labels: data.popularCategories.map(item => item.name),
            datasets: [
              {
                data: data.popularCategories.map(item => item.value),
                backgroundColor: [
                  '#14b8a6',
                  '#0d9488',
                  '#0f766e',
                  '#115e59',
                  '#134e4a',
                ],
                borderWidth: 0,
              },
            ],
          });
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

      <div className={styles.chartsGrid}>
        {currentUser.role === 'admin' && chartData && (
          <div className={styles.chartCard}>
            <h3 className={styles.cardTitle}>Tăng trưởng doanh thu 2024</h3>
            <div className={styles.chartWrapper}>
              <Bar 
                data={chartData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                  scales: { y: { beginAtZero: true } }
                }} 
              />
            </div>
          </div>
        )}

        {pieData && (
          <div className={styles.chartCard}>
            <h3 className={styles.cardTitle}>Phân loại thực đơn</h3>
            <div className={styles.chartWrapper} style={{ height: '250px' }}>
              <Doughnut 
                data={pieData} 
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: 'bottom' } }
                }}
              />
            </div>
          </div>
        )}

        {(currentUser.role === 'admin' || currentUser.role === 'manager') && (
          <div className={styles.chartCard}>
            <h3 className={styles.cardTitle}>Món ăn bán chạy nhất</h3>
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

export default Analytics;
