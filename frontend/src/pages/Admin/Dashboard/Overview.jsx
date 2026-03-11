import React from 'react';
import styles from './Dashboard.module.scss';

const StatCard = ({ title, value, icon, color }) => (
  <div className={styles.statCard} style={{ borderLeft: `4px solid ${color}` }}>
    <div className={styles.statIcon}>{icon}</div>
    <div className={styles.statInfo}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  </div>
);

const Overview = () => {
  const stats = [
    { title: 'Doanh thu ngày', value: '15,200,000đ', icon: '💰', color: '#D4734A' },
    { title: 'Đơn hàng mới', value: '24', icon: '🛒', color: '#E8925C' },
    { title: 'Khách hàng', value: '12', icon: '👥', color: '#C9A961' },
    { title: 'Bàn đang sử dụng', value: '8/20', icon: '🍽️', color: '#8B9F7F' }
  ];

  return (
    <div className={styles.dashboardOverview}>
      <header className={styles.overviewHeader}>
        <h2>Tổng Quan Hệ Thống</h2>
        <div className={styles.datePicker}>
          <input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
        </div>
      </header>

      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className={styles.dashboardContent}>
        <div className={styles.recentOrders}>
          <h3>Đơn hàng gần đây</h3>
          <div className={styles.tableResponsive}>
            <table>
              <thead>
                <tr>
                  <th>Mã đơn</th>
                  <th>Khách hàng</th>
                  <th>Bàn</th>
                  <th>Tổng tiền</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ORD001</td>
                  <td>Nguyễn Văn A</td>
                  <td>05</td>
                  <td>450,000đ</td>
                  <td><span className={styles.statusDone}>Hoàn thành</span></td>
                </tr>
                <tr>
                  <td>#ORD002</td>
                  <td>Trần Thị B</td>
                  <td>12</td>
                  <td>1,200,000đ</td>
                  <td><span className={styles.statusPending}>Chờ xử lý</span></td>
                </tr>
                <tr>
                  <td>#ORD003</td>
                  <td>Lê Văn C</td>
                  <td>08</td>
                  <td>850,000đ</td>
                  <td><span className={styles.statusServing}>Đang phục vụ</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.popularItems}>
          <h3>Món bán chạy</h3>
          <ul className={styles.itemList}>
            <li>
              <span>Bò Lúc Lắc</span>
              <span>12 đơn</span>
            </li>
            <li>
              <span>Cá Hồi Áp Chảo</span>
              <span>8 đơn</span>
            </li>
            <li>
              <span>Trà Đào Cam Sả</span>
              <span>15 ly</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Overview;
