# 💻 RMS Frontend - React Client

Giao diện người dùng hiện đại dành cho Khách hàng, Đầu bếp, Quản lý và Quản trị viên.

---

## 🛠️ Tech Stack
- **Framework**: React 19 (Vite)
- **Styling**: SCSS Modules (Responsive & Animations)
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: React Router DOM v7
- **Real-time**: Socket.io Client

---

## 📂 Cấu Trúc Thư Mục

```text
frontend/
├── src/
│   ├── assets/       # Styles (SCSS), hình ảnh, icons
│   ├── components/   # Các thành phần giao diện dùng chung
│   ├── constants/    # Dữ liệu tĩnh, cấu hình text
│   ├── pages/        # Giao diện chính của các vai trò (Admin, Auth, Chef, Customer, Manager)
│   ├── routes/       # Cấu hình định tuyến (Routing)
│   ├── App.jsx       # Component chính xử lý Login & Phân quyền
│   └── main.jsx      # Điểm khởi đầu của ứng dụng
├── .env              # Cấu hình URL API & Socket (Không commit)
└── vite.config.js    # Cấu hình công cụ đóng gói Vite
```

---

## 📱 Các Vai Trò Người Dùng

### 🍽️ Khách hàng (Tablet tại bàn)
- Giao diện tối ưu cho máy tính bảng.
- Nhập mã PIN để mở bàn và gọi món.
- Theo dõi tiến độ chế biến món ăn Real-time.

### 👨‍🍳 Đầu bếp (Màn hình bếp)
- Danh sách món ăn cần chế biến sắp xếp theo thời gian.
- Một chạm để cập nhật trạng thái món ăn.

### 💼 Quản lý (Quầy thu ngân)
- Sơ đồ bàn trực quan (Trống, Đang dùng, Chờ thanh toán).
- Thao tác mở bàn, gộp bàn và xác nhận hóa đơn.

### ⚙️ Quản trị viên (Admin Dashboard)
- Quản lý toàn bộ thực đơn và danh mục món ăn.
- Xem biểu đồ doanh thu và quản lý tài khoản nhân viên.

---

## 🚀 Hướng Dẫn Chạy

1. Cài đặt thư viện: `npm install`
2. Cấu hình file `.env` với `VITE_API_URL` và `VITE_SOCKET_URL`.
3. Khởi chạy ứng dụng: `npm run dev`

Ứng dụng sẽ mặc định chạy tại: `http://localhost:5173`
