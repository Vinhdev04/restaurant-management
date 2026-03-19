# 🍽️ Restaurant Management System (RMS) - Hệ Thống Quản Lý Nhà Hàng Toàn Diện

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=white)](https://socket.io/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

Hệ thống quản lý nhà hàng thông minh (Fullstack) tích hợp công nghệ **Real-time**, tối ưu hóa toàn bộ quy trình vận hành từ lúc khách hàng bước vào quán, gọi món tại bàn, chế biến tại bếp đến quản lý doanh thu và nhân sự.

---

## 🏗️ Kiến Trúc Hệ Thống

Dự án được xây dựng theo mô hình **Client-Server** hiện đại, tách biệt hoàn toàn Frontend và Backend để dễ dàng mở rộng:

- **Frontend (Client)**: 
  - Framework: ReactJS 19 (Vite).
  - Styling: SCSS Modules (Thiết kế Responsive, hỗ trợ đa thiết bị từ Mobile đến Tablet/Desktop).
  - State Management: React Hooks & Socket.io Client.
- **Backend (Server)**:
  - Runtime: NodeJS & ExpressJS.
  - Real-time: Socket.io (Đồng bộ dữ liệu tức thì giữa các phân hệ).
  - Database: MongoDB (Mongoose ODM) - Lưu trữ linh hoạt, tốc độ truy vấn cao.
- **Bảo mật**: Cơ chế xác thực tài khoản & Phân quyền dựa trên **Roles** (Admin, Manager, Chef).

---

## 🚀 Tính Năng Chi Tiết Theo Phân Hệ

### 📱 1. Phân hệ Khách hàng (Tablet Order)
- **Mã PIN Bảo mật**: Mỗi bàn được cấp một mã PIN riêng để truy cập thực đơn, đảm bảo tính riêng tư và chính xác.
- **E-Menu Thông minh**: Thực đơn trực quan, hỗ trợ tìm kiếm, lọc theo danh mục (Khai vị, Món chính, Đồ uống...).
- **Đặt món tại bàn**: Khách hàng tự chọn món và gửi yêu cầu trực tiếp xuống Bếp mà không cần nhân viên phục vụ.
- **Theo dõi Real-time**: Khách hàng xem được trạng thái từng món ăn (Đang chờ -> Đang làm -> Hoàn thành).
- **Yêu cầu Thanh toán**: Gửi thông báo "Tính tiền" tới Quầy quản lý ngay trên Tablet.

### 👨‍🍳 2. Phân hệ Bếp (Kitchen Display System - KDS)
- **Tiếp nhận đơn hàng tức thì**: Đơn hàng từ khách hàng sẽ hiện lên màn hình Bếp ngay lập tức qua Socket.io.
- **Quản lý chế biến**: Đầu bếp cập nhật trạng thái món ăn khi bắt đầu làm và khi hoàn thành.
- **Quản lý kho món**: Đánh dấu món ăn "Hết hàng" để hệ thống tự động ẩn trên E-Menu của khách hàng.

### 💼 3. Phân hệ Quản lý (Manager POS)
- **Sơ đồ bàn trực quan**: Theo dõi trạng thái toàn bộ các bàn (Trống, Đang có khách, Chờ thanh toán).
- **Điều phối bàn**: Mở bàn mới, gộp bàn (Merge), tách bàn (Unmerge), cấp lại mã PIN.
- **Xác nhận hóa đơn**: Kiểm tra đơn hàng và xác nhận thanh toán khi khách hàng hoàn tất bữa ăn.

### ⚙️ 4. Phân hệ Quản trị (Admin Dashboard)
- **Thống kê Doanh thu**: Biểu đồ và số liệu tổng quan về tình hình kinh doanh theo ngày/tháng.
- **Quản lý Thực đơn (CRUD)**: Thêm mới món ăn, cập nhật giá, hình ảnh và danh mục món.
- **Quản lý Nhân sự**: Cấp tài khoản nhân viên và phân quyền truy cập hệ thống.

---

## 📡 Luồng Dữ Liệu Real-time (Socket.io)

Hệ thống đảm bảo sự đồng bộ tuyệt đối giữa các bộ phận:
1. **Khách đặt món** -> Socket phát tín hiệu `NEW_ORDER_RECEIVED` -> **Bếp** nhận đơn hàng.
2. **Bếp làm xong** -> Socket phát tín hiệu `ITEM_COMPLETED` -> **Khách hàng** nhận thông báo món đã xong.
3. **Khách yêu cầu tính tiền** -> Socket phát tín hiệu `PAYMENT_REQUESTED` -> **Quản lý** nhận thông báo thanh toán.
4. **Quản lý xác nhận thanh toán** -> Socket phát tín hiệu `PAYMENT_CONFIRMED` -> **Khách hàng** nhận thông báo & Bàn tự động chuyển về trạng thái Trống.

---

## 🛠️ Công Nghệ & Thư Viện Sử Dụng

| Phân loại | Công nghệ chi tiết |
| :--- | :--- |
| **Frontend Core** | React 19, React Router DOM v7, Vite |
| **Styling** | SCSS Modules, Normalize.css, Bootstrap 5 |
| **Backend Core** | NodeJS, ExpressJS, Mongoose |
| **Real-time** | Socket.io (Websocket) |
| **Bảo mật** | express-rate-limit, CORS, Cluster Mode |
| **Database** | MongoDB Cloud Atlas |
| **Tooling** | Git, ESLint, Dotenv, Prettier |

---

## 🛡️ Bảo Mật & Hiệu Năng

Hệ thống được tối ưu hóa cho môi trường sản xuất với các tính năng:
- **Rate Limiting**: Giới hạn 100 yêu cầu/15 phút từ mỗi IP để ngăn chặn tấn công Brute-force và DDoS.
- **Load Balancing**: Sử dụng **NodeJS Cluster Mode** để tận dụng tối đa sức mạnh của CPU đa nhân (chỉ kích hoạt ở môi trường `production`).
- **CORS Policy**: Cấu hình nghiêm ngặt chỉ cho phép các domain được tin cậy truy cập API.
- **Environment Variables**: Toàn bộ thông tin nhạy cảm (DB URI, JWT Secret) được quản lý qua tệp `.env`.

---

## 📂 Cấu Trúc Dự Án

```text
restaurant-management/
├── backend/                # Mã nguồn Server (NodeJS)
│   ├── controllers/        # Xử lý logic API (Auth, Admin, Chef, Manager, Customer, Reservation)
│   ├── models/             # Schema MongoDB (User, Menu, Table, Order, Reservation)
│   ├── routes/             # Định tuyến API
│   ├── app.js              # Khởi tạo Server, Socket.io, Rate Limit & Cluster
│   └── seed.js             # Dữ liệu mẫu (Users, Menu, Tables)
├── frontend/               # Mã nguồn Client (React)
│   ├── src/
│   │   ├── components/     # UI Components (Admin, Shared, Layout)
│   │   ├── pages/          # Giao diện (Admin, Auth, Home, Menu, Reservation)
│   │   ├── assets/         # Styles & Images
│   │   ├── routes/         # Cấu hình Routing tập trung
│   │   └── App.jsx         # Logic Phân quyền & Khởi tạo Socket
└── .gitignore              # Bảo mật file cấu hình (.env)
```

---

## 🏁 Hướng Dẫn Khởi Chạy

### 1. Cấu hình môi trường
Tạo file `.env` trong thư mục `backend/` và `frontend/`:

**Backend (.env):**
```env
PORT=5000
MONGODB_URI=your_mongodb_atlas_uri
DEFAULT_PASSWORD=123
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

### 2. Cài đặt và Chạy
**Backend:**
```bash
cd backend
npm install
npm start
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 📝 Thông Tin Phát Triển
Dự án được thiết kế hướng tới sự ổn định, bảo mật và trải nghiệm người dùng tối ưu. Mọi dữ liệu nhạy cảm đã được chuyển vào biến môi trường để đảm bảo an toàn.

**Phát triển bởi Vinhdev04** 🚀
