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
mongoose.connect('mongodb+srv://Toan:123@cluster0.0hmrrgm.mongodb.net/NhaHang_DB?retryWrites=true&w=majority')
    .then(() => console.log("✅ Kết nối MongoDB Cloud thành công!"))
    .catch(err => console.error("❌ Lỗi kết nối MongoDB:", err));

// 3. MỞ CỬA CÁC API
app.use('/api/admin', adminRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/chef', chefRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/auth', authRoutes);

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server chạy tại: http://localhost:${PORT}`);
});