require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

// 1. IMPORT CÁC ĐƯỜNG DẪN API (ROUTES)
const adminRoutes = require('./routes/admin.route');
const customerRoutes = require('./routes/customer.route');
const chefRoutes = require('./routes/chef.route');
const managerRoutes = require('./routes/manager.route');
const authRoutes = require('./routes/auth.route');

const app = express();
const server = http.createServer(app);

// Cấu hình bộ đàm Socket.io
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
});
app.set('socketio', io);

app.use(cors());
app.use(express.json()); // Giúp Backend đọc được cục data (Gà rán, 50k) mà Frontend gửi lên

// 2. KẾT NỐI DATABASE
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    console.error("❌ Lỗi: MONGODB_URI chưa được cấu hình trong file .env");
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
    .then(() => console.log("✅ Kết nối MongoDB Cloud thành công!"))
    .catch(err => {
        console.error("❌ Lỗi kết nối MongoDB:", err);
        console.log("💡 Gợi ý: Kiểm tra lại MONGODB_URI trong file .env và quyền truy cập IP trên Atlas");
    });

// 3. MỞ CỬA CÁC API
app.use('/api/admin', adminRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/chef', chefRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server chạy tại: http://localhost:${PORT}`);
});
