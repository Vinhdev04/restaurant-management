# 🚀 RMS Backend - NodeJS API Server

Server xử lý logic nghiệp vụ, kết nối cơ sở dữ liệu và quản lý giao tiếp Real-time cho hệ thống quản lý nhà hàng.

---

## 🛠️ Tech Stack
- **Runtime**: NodeJS
- **Framework**: ExpressJS
- **Database**: MongoDB (Mongoose ODM)
- **Real-time**: Socket.io
- **Environment**: Dotenv

---

## 📂 Cấu Trúc Thư Mục

```text
backend/
├── controllers/    # Xử lý logic cho các yêu cầu API (Admin, Chef, Manager, Customer, Auth)
├── models/         # Định nghĩa cấu trúc dữ liệu (Schema) của MongoDB
├── routes/         # Định tuyến các đường dẫn API
├── services/       # Các dịch vụ bổ trợ xử lý logic phức tạp
├── .env            # Cấu hình biến môi trường (Không commit)
├── app.js          # Điểm khởi đầu của ứng dụng
├── seed.js         # Script tạo dữ liệu mẫu ban đầu
└── package.json    # Quản lý dependencies và scripts
```

---

## 🔑 Các API Chính

- `/api/auth`: Đăng nhập, phân quyền người dùng.
- `/api/admin`: Quản lý thực đơn, bàn và xem báo cáo doanh thu.
- `/api/customer`: Đặt món, kiểm tra mã PIN, yêu cầu thanh toán.
- `/api/chef`: Lấy danh sách món chờ chế biến, cập nhật trạng thái món.
- `/api/manager`: Quản lý sơ đồ bàn, xác nhận thanh toán.

---

## 📡 Socket.io Events

Hệ thống sử dụng các sự kiện sau để đồng bộ Real-time:
- `NEW_ORDER_RECEIVED`: Thông báo cho Bếp và Quản lý khi có đơn hàng mới.
- `ITEM_COMPLETED`: Thông báo cho Khách hàng khi món ăn đã xong.
- `PAYMENT_REQUESTED`: Thông báo cho Quản lý khi khách yêu cầu tính tiền.
- `PAYMENT_CONFIRMED`: Thông báo cho Khách hàng và Quản lý khi thanh toán hoàn tất.

---

## 🚀 Hướng Dẫn Chạy

1. Cài đặt thư viện: `npm install`
2. Cấu hình file `.env` với `MONGODB_URI`.
3. (Tùy chọn) Tạo dữ liệu mẫu: `npm run seed`
4. Khởi chạy server: `npm start`

Server sẽ mặc định chạy tại: `http://localhost:5000`
