const User = require('../models/User.model');

// Tự động tạo tài khoản mặc định nếu DB chưa có ai
const seedUsers = async () => {
    try {
        const count = await User.countDocuments();
        if (count === 0) {
            const defaultPassword = process.env.DEFAULT_PASSWORD || '123';
            await User.insertMany([
                { username: process.env.ADMIN_USER || 'admin', password: defaultPassword, role: 'admin' },
                { username: process.env.MANAGER_USER || 'quanly', password: defaultPassword, role: 'manager' },
                { username: process.env.CHEF_USER || 'daubep', password: defaultPassword, role: 'chef' }
            ]);
            console.log("✅ Đã tạo các tài khoản mặc định từ cấu hình .env");
        }
    } catch (error) {
        console.error("⚠️ Không thể tự động seed users (có thể do chưa kết nối DB):", error.message);
    }
};
// Đợi 2s để DB kịp kết nối rồi mới check seed
setTimeout(seedUsers, 2000);

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(`Đang thử đăng nhập: ${username}`);
        
        const user = await User.findOne({ username, password });
        
        if (!user) {
            console.log(`Đăng nhập thất bại: Người dùng ${username} không tồn tại hoặc sai mật khẩu`);
            return res.status(401).json({ message: "Sai tên đăng nhập hoặc mật khẩu!" });
        }

        console.log(`Đăng nhập thành công: ${username} (Quyền: ${user.role})`);
        // Trả về thông tin user và quyền của họ
        res.status(200).json({ 
            message: "Đăng nhập thành công!",
            user: { username: user.username, role: user.role }
        });
    } catch (error) {
        console.error("Lỗi server khi đăng nhập:", error);
        res.status(500).json({ message: "Lỗi server!", error: error.message });
    }
};

module.exports = { login };