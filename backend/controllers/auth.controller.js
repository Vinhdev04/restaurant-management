const User = require('../models/User.model');

// Tự động tạo tài khoản mặc định nếu DB chưa có ai
const seedUsers = async () => {
    const count = await User.countDocuments();
    if (count === 0) {
        await User.insertMany([
            { username: 'admin', password: '123', role: 'admin' },
            { username: 'quanly', password: '123', role: 'manager' },
            { username: 'daubep', password: '123', role: 'chef' }
        ]);
        console.log("Đã tạo 3 tài khoản mặc định: admin, quanly, daubep (Mật khẩu chung: 123)");
    }
};
seedUsers();

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        
        if (!user) {
            return res.status(401).json({ message: "Sai tên đăng nhập hoặc mật khẩu!" });
        }

        // Trả về thông tin user và quyền của họ
        res.status(200).json({ 
            message: "Đăng nhập thành công!",
            user: { username: user.username, role: user.role }
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!" });
    }
};

module.exports = { login };