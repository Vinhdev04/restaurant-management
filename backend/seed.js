require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User.model');
const Menu = require('./models/Menu.model');
const Table = require('./models/Table.model');

const MONGODB_URI = process.env.MONGODB_URI;

const seedData = async () => {
    if (!MONGODB_URI) {
        console.error("❌ Lỗi: MONGODB_URI chưa được cấu hình trong file .env");
        process.exit(1);
    }
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("✅ Kết nối MongoDB thành công để seed data!");

        // 1. Seed Users
        await User.deleteMany({});
        const defaultPassword = process.env.DEFAULT_PASSWORD || '123';
        const users = [
            { username: process.env.ADMIN_USER || 'admin', password: defaultPassword, role: 'admin' },
            { username: process.env.MANAGER_USER || 'manager', password: defaultPassword, role: 'manager' },
            { username: process.env.CHEF_USER || 'chef', password: defaultPassword, role: 'chef' }
        ];
        await User.insertMany(users);
        console.log("✅ Đã seed Users!");

        // 2. Seed Menu
        await Menu.deleteMany({});
        const menuItems = [
            { name: 'Gà rán', price: 50000, category: 'Món chính', image: 'https://via.placeholder.com/150' },
            { name: 'Pizza Hải Sản', price: 120000, category: 'Món chính', image: 'https://via.placeholder.com/150' },
            { name: 'Salad Nga', price: 45000, category: 'Khai vị', image: 'https://via.placeholder.com/150' },
            { name: 'Coca Cola', price: 15000, category: 'Đồ uống', image: 'https://via.placeholder.com/150' },
            { name: 'Kem Vanila', price: 25000, category: 'Tráng miệng', image: 'https://via.placeholder.com/150' }
        ];
        await Menu.insertMany(menuItems);
        console.log("✅ Đã seed Menu!");

        // 3. Seed Tables
        await Table.deleteMany({});
        const tables = [
            { tableId: 'Table 01', status: 'Trống', unlockCode: '111111' },
            { tableId: 'Table 02', status: 'Trống', unlockCode: '222222' },
            { tableId: 'Table 03', status: 'Trống', unlockCode: '333333' },
            { tableId: 'Table 04', status: 'Trống', unlockCode: '444444' },
            { tableId: 'Table 05', status: 'Trống', unlockCode: '555555' }
        ];
        await Table.insertMany(tables);
        console.log("✅ Đã seed Tables!");

        console.log("🚀 TẤT CẢ DỮ LIỆU ĐÃ ĐƯỢC SEED THÀNH CÔNG!");
        process.exit();
    } catch (err) {
        console.error("❌ Lỗi khi seed data:", err);
        process.exit(1);
    }
};

seedData();
