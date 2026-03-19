require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const rateLimit = require('express-rate-limit');
const cluster = require('cluster');
const os = require('os');

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
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// Giới hạn số lượng yêu cầu (Rate Limiting)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 phút
    max: 100, // Tối đa 100 yêu cầu từ một IP trong 15 phút
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
        console.log(`✅ Worker ${process.pid}: Kết nối MongoDB thành công!`);
    } catch (err) {
        console.error(`❌ Worker ${process.pid}: Lỗi kết nối MongoDB:`, err.message);
    }
};

// 3. MỞ CỬA CÁC API
app.use('/api/admin', adminRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/chef', chefRoutes);
app.use('/api/manager', managerRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/reservation', reservationRoutes);

// Load Balancing với Cluster Mode
if (cluster.isMaster && process.env.NODE_ENV === 'production') {
    const numCPUs = os.cpus().length;
    console.log(`🚀 Master ${process.pid} is running. Scaling to ${numCPUs} CPUs...`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`⚠️ Worker ${worker.process.pid} died. Forking a new one...`);
        cluster.fork();
    });
} else {
    connectDB();
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
        console.log(`🚀 Worker ${process.pid} đang lắng nghe tại: http://localhost:${PORT}`);
    });
}
