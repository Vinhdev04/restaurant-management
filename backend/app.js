require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const rateLimit = require('express-rate-limit');

// 1. IMPORT CÁC ĐƯỜNG DẪN API (ROUTES)
const adminRoutes = require('./routes/admin.route');
const customerRoutes = require('./routes/customer.route');
const chefRoutes = require('./routes/chef.route');
const managerRoutes = require('./routes/manager.route');
const authRoutes = require('./routes/auth.route');
const reservationRoutes = require('./routes/reservation.route');

const app = express();
const server = http.createServer(app);

// Cấu hình bộ đàm Socket.io
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
        methods: ["GET", "POST", "PUT", "DELETE"],
    }
});
app.set('socketio', io);

// Middleware
app.use(cors({
    origin: true, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Giới hạn số lượng yêu cầu (Rate Limiting)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: { message: "Quá nhiều yêu cầu từ IP này, vui lòng thử lại sau 15 phút!" },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api/', limiter);

app.use(express.json());

// 2. KẾT NỐI DATABASE
const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        if (!MONGODB_URI) {
            throw new Error("MONGODB_URI chưa được cấu hình trong file .env");
        }
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log(`✅ Kết nối MongoDB thành công!`);
    } catch (err) {
        console.error(`❌ Lỗi kết nối MongoDB:`, err.message);
        mongoose.set('bufferCommands', false);
    }
};

// 3. MỞ CỬA CÁC API
app.use('/api/admin', adminRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/chef', chefRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reservation', reservationRoutes);

// Khởi động server
connectDB();
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server đang lắng nghe tại: http://localhost:${PORT}`);
});
