frontend/src/
├── assets/             # Hình ảnh món ăn & Icon hệ thống
├── components/         # UI dùng chung (Button, Modal, Navbar)
├── constants/          # Trạng thái (PENDING, COOKING, DONE) [cite: 27, 28]
├── hooks/              # Custom hooks để xử lý Socket & API
├── pages/              # Giao diện riêng cho từng Actor 
│   ├── Admin/          # Quản lý Menu, Nhân sự, Báo cáo [cite: 21, 22]
│   ├── Chef/           # Màn hình tiếp nhận & Cập nhật món [cite: 26, 27]
│   ├── Staff/          # Quản lý sơ đồ bàn & Thanh toán [cite: 33, 37]
│   └── Customer/       # Menu gọi món & Theo dõi trạng thái [cite: 39, 40]
├── services/           # Axios/API calls cho từng phân hệ
├── store/              # Quản lý trạng thái (Redux/Zustand) cho Giỏ hàng, User
└── App.jsx