# 🍽️ Restaurant Management System (RMS) - Fullstack Solution

Hệ thống quản lý nhà hàng toàn diện (Fullstack) tích hợp Real-time, hỗ trợ quy trình từ gọi món tại bàn đến quản lý bếp và doanh thu.

---

## 🏗️ Kiến Trúc Hệ Thống

Dự án được xây dựng theo mô hình **Client-Server** hiện đại:
- **Frontend**: ReactJS (Vite) + SCSS Modules (Giao diện người dùng & Quản trị).
- **Backend**: NodeJS (Express) + MongoDB (Cơ sở dữ liệu) + Socket.io (Xử lý thời gian thực).

---

## 🚀 Tính Năng Chính

### 1. Dành cho Khách hàng (Customer)
- **E-Menu**: Xem thực đơn, lọc theo danh mục, tìm kiếm món ăn.
- **Order tại bàn**: Gọi món trực tiếp qua máy tính bảng (Tablet) tại bàn sau khi nhập mã PIN.
- **Theo dõi đơn hàng**: Xem trạng thái món ăn (Đang chờ, Đang chế biến, Hoàn thành) theo thời gian thực.
- **Yêu cầu thanh toán**: Gửi thông báo thanh toán tới quản lý.

### 2. Dành cho Đầu bếp (Chef)
- **Màn hình bếp**: Tiếp nhận đơn hàng mới tức thì qua Socket.io.
- **Cập nhật trạng thái**: Đánh dấu món ăn đã hoàn thành để phục vụ.
- **Quản lý kho món**: Đánh dấu món ăn "Hết hàng" (Sold out) ngay trên hệ thống.

### 3. Dành cho Quản lý (Manager)
- **Quản lý sơ đồ bàn**: Mở bàn, cấp mã PIN cho khách, gộp bàn, tách bàn.
- **Xác nhận thanh toán**: Tiếp nhận yêu cầu và xác nhận hóa đơn của khách.

### 4. Dành cho Quản trị viên (Admin)
- **Dashboard**: Thống kê doanh thu, số lượng đơn hàng.
- **Quản lý thực đơn**: Thêm, sửa, xóa món ăn và danh mục.
- **Quản lý nhân sự**: Cấp tài khoản và phân quyền (Admin, Manager, Chef).

---

## 🛠️ Công Nghệ Sử Dụng

| Thành phần | Công nghệ |
| :--- | :--- |
| **Frontend** | React 19, Vite, SCSS, React Router 7, Socket.io Client |
| **Backend** | NodeJS, Express, Mongoose, Socket.io |
| **Database** | MongoDB Cloud (Atlas) |
| **Tooling** | ESLint, Prettier, Git |

---

## 📦 Cấu Trúc Dự Án

```text
restaurant-management/
├── backend/            # Mã nguồn Server & API
├── frontend/           # Mã nguồn Giao diện React
├── .gitignore          # Cấu hình bỏ qua file trong Git
└── readme.md           # Tài liệu hướng dẫn chính
```

---

## 🏁 Hướng Dẫn Cài Đặt & Chạy Dự Án

### 1. Yêu cầu hệ thống
- NodeJS (v16+)
- MongoDB (Local hoặc Cloud Atlas)

### 2. Cấu hình môi trường (.env)
Tạo file `.env` trong thư mục `backend/` và `frontend/` dựa trên các biến sau:

**Backend (.env):**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
DEFAULT_PASSWORD=123
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

### 3. Khởi chạy
**Chạy Backend:**
```bash
cd backend
npm install
npm start
```

**Chạy Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 📝 Ghi Chú
Dự án sử dụng **Socket.io** để đồng bộ dữ liệu Real-time giữa Khách hàng - Bếp - Quản lý. Vui lòng đảm bảo Backend chạy trước khi mở Frontend.

**Phát triển bởi Vinhdev04** 🚀
