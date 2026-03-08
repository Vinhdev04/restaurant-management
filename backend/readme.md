backend/
├── src/
│   ├── config/             # Kết nối Database & Socket.io 
│   ├── controllers/        # Tiếp nhận Request từ 4 Actor [cite: 2, 10]
│   │   ├── admin.controller.js
│   │   ├── chef.controller.js
│   │   ├── manager.controller.js
│   │   └── customer.controller.js
│   ├── services/           # Logic nghiệp vụ lõi (Gộp bàn, Tính điểm...) [cite: 2, 10]
│   │   ├── tableService.js
│   │   ├── orderService.js
│   │   ├── menuService.js
│   │   └── paymentService.js [cite: 3]
│   ├── models/             # Schema: User, Table, Menu, Order, Customer 
│   ├── routes/             # Định tuyến API v1 [cite: 6, 11]
│   ├── middlewares/        # Auth (JWT) & Phân quyền (Role) [cite: 7, 12]
│   ├── sockets/            # Xử lý sự kiện Real-time (Bếp báo xong...) [cite: 3, 13]
│   ├── utils/              # Hàm hỗ trợ (Tính điểm, Format tiền) [cite: 7, 13]
│   └── server.js           # File chạy chính [cite: 8, 13]
└── .env                    # Biến môi trường (DB_URI, JWT_SECRET) [cite: 8, 14]