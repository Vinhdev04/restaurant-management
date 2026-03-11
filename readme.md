# 🍽️ Restaurant Management System (RMS)

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)](https://sass-lang.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

Hệ thống quản lý nhà hàng thông minh, hiện đại và tối ưu hóa quy trình vận hành toàn diện. Dự án tập trung vào trải nghiệm người dùng mượt mà, từ việc đặt món trực tuyến đến quản lý hệ thống phía Admin.

---

## ✨ Tính Năng Nổi Bật Đã Hoàn Thành

### 🎨 Giao diện & Trải nghiệm người dùng (UI/UX)
- **Thiết kế Hiện đại**: Sử dụng phong cách thiết kế sang trọng với tông màu Terracotta chủ đạo.
- **Responsive Design**: Tối ưu hóa hiển thị hoàn hảo trên mọi thiết bị (Mobile, Tablet, Desktop) thông qua hệ thống chuẩn hóa `responsive.module.scss`.
- **Skeleton Loading**: Hiệu ứng tải trang mượt mà, chuyên nghiệp cho danh sách thực đơn.
- **Promotion Popup**: Thông báo khuyến mãi tự động xuất hiện với hiệu ứng animation bắt mắt và thanh đếm ngược tự động đóng.

### 🍱 Thực đơn thông minh (E-Menu)
- **Phân loại đa dạng**: Hỗ trợ lọc món ăn theo danh mục (Khai vị, Món chính, Đồ uống, Tráng miệng).
- **Infinity Scroll & Pagination**: Kết hợp cuộn vô hạn và phân trang để tối ưu trải nghiệm khám phá món ăn.
- **Tùy chọn món ăn (Options)**: Cho phép khách hàng chọn thêm topping, mức độ cay, kích cỡ... với giá cập nhật thời gian thực.
- **Gợi ý món ăn (Recommendations)**: Hệ thống tự động gợi ý các món dùng kèm phù hợp ngay trong form đặt món.

### 📅 Đặt bàn & Đặt món trực tiếp
- **Reservation System**: Trang đặt bàn chuyên nghiệp với đầy đủ thông tin khách hàng, thời gian và yêu cầu đặc biệt.
- **Quick Order Modal**: Đặt món nhanh chóng thông qua cửa sổ Modal mà không cần chuyển trang.
- **Real-time Calculation**: Tự động tính toán tổng hóa đơn bao gồm số lượng và các tùy chọn đi kèm.

### 🔐 Hệ thống Tài khoản
- **Authentication**: Trang Đăng nhập và Đăng ký được thiết kế đẹp mắt, hỗ trợ điều hướng thông minh trên Navbar.
- **User Roles**: Phân biệt trạng thái hiển thị giữa khách vãng lai và quản trị viên (Admin).

---

## 🛠 Công Nghệ Sử Dụng

### Frontend
- **Core**: ReactJS (Vite)
- **Styling**: SCSS (Modules), Animation CSS3
- **Routing**: React Router DOM v6
- **Icons**: FontAwesome, Emoji Unicode
- **Images**: Unsplash API (Demo data)

### Backend (Đang phát triển)
- NodeJS, Express
- MongoDB / PostgreSQL
- Socket.io (Real-time updates)

---

## 📂 Cấu Trúc Thư Mục Chính

```text
src/
├── assets/          # Tài nguyên tĩnh (Styles, Images)
├── components/      # Các component dùng chung (Modal, Header, Footer...)
├── constants/       # Dữ liệu tĩnh và cấu hình
├── pages/           # Các trang chính (Home, Menu, Reservation, Auth, Admin)
├── routes/          # Cấu hình hệ thống định tuyến
└── App.jsx          # Component gốc của ứng dụng
```

---

## 🚀 Hướng Dẫn Cài Đặt

1. **Clone repository**:
   ```bash
   git clone https://github.com/Vinhdev04/restaurant-management.git
   ```

2. **Cài đặt dependencies**:
   ```bash
   cd restaurant-management/frontend
   npm install
   ```

3. **Chạy ứng dụng ở môi trường development**:
   ```bash
   npm run dev
   ```

---

## 📝 Ghi Chú Phát Triển
Dự án đang trong quá trình hoàn thiện các tính năng Backend và kết nối Real-time. Mọi đóng góp hoặc báo lỗi vui lòng tạo Issue trên GitHub.

**Phát triển bởi Vinhdev04** 🚀
