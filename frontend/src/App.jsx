import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@components/shared/Header/Header.jsx';
import Footer from '@components/shared/Footer/Footer.jsx';
import BackToTop from '@components/shared/BackToTop/BackToTop.jsx';
import { Suspense } from 'react';
import routes from '@routes/index.route.js';

// Example page components (you can replace with your actual pages)
const HomePage = () => (
  <div className="page-content">
    <h1>Trang chủ</h1>
    <p>Chào mừng đến với hệ thống quản lý nhà hàng</p>
  </div>
);

const MenuPage = () => (
  <div className="page-content">
    <h1>Thực đơn</h1>
    <p>Danh sách các món ăn</p>
  </div>
);

const ReservationPage = () => (
  <div className="page-content">
    <h1>Đặt bàn</h1>
    <p>Form đặt bàn trực tuyến</p>
  </div>
);

const AdminDashboard = () => (
  <div className="page-content">
    <h1>Dashboard</h1>
    <p>Tổng quan quản lý</p>
  </div>
);

function App() {
  return (
    <Suspense >
      <Router>
        <div className="app">
          
          <Header />

          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/menu/*" element={<MenuPage />} />
              <Route path="/reservation" element={<ReservationPage />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
            </Routes>

          
            <div className="demo-content">
              <section className="demo-section">
                <h2>Về hệ thống</h2>
                <p>
                  Hệ thống quản lý nhà hàng được thiết kế để tối ưu hóa quy trình 
                  vận hành, từ việc tiếp nhận đơn hàng đến quản lý bàn ăn và thanh toán.
                </p>
              </section>

              <section className="demo-section">
                <h2>Tính năng nổi bật</h2>
                <ul>
                  <li>Quản lý thực đơn trực quan</li>
                  <li>Đặt bàn trực tuyến</li>
                  <li>Theo dõi đơn hàng realtime</li>
                  <li>Báo cáo thống kê chi tiết</li>
                  <li>Quản lý nhân sự hiệu quả</li>
                </ul>
              </section>

              <section className="demo-section">
                <h2>Dành cho các Actor</h2>
                <div className="actor-grid">
                  <div className="actor-card">
                    <h3>👨‍💼 Admin</h3>
                    <p>Quản lý toàn bộ hệ thống, nhân sự và báo cáo</p>
                  </div>
                  <div className="actor-card">
                    <h3>👨‍🍳 Đầu bếp</h3>
                    <p>Tiếp nhận và cập nhật trạng thái món ăn</p>
                  </div>
                  <div className="actor-card">
                    <h3>👔 Nhân viên</h3>
                    <p>Quản lý bàn ăn và xử lý thanh toán</p>
                  </div>
                  <div className="actor-card">
                    <h3>👥 Khách hàng</h3>
                    <p>Đặt món và theo dõi trạng thái</p>
                  </div>
                </div>
              </section>
            </div>
          </main>

        
          <Footer />

        
          <BackToTop />
        </div>
      </Router>
    </Suspense>
  );
}

export default App;