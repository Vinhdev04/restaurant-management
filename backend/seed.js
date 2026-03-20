require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User.model');
const Menu = require('./models/Menu.model');
const Table = require('./models/Table.model');
const Reservation = require('./models/Reservation.model');

const MONGODB_URI = process.env.MONGODB_URI;

const menuData = [
    {
        name: "Tôm hùm bông sốt Singapore",
        price: 2800000,
        category: "Món chính",
        image: "https://images.unsplash.com/photo-1559742811-824289511f48?q=80&w=500",
        description: "Tôm hùm bông thượng hạng kết hợp sốt Singapore đặc trưng.",
        isSoldOut: false
    },
    {
        name: "Chè khúc bạch",
        price: 45000,
        category: "Tráng miệng",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=500",
        description: "Món tráng miệng thanh mát, ngọt dịu.",
        isSoldOut: false
    },
    {
        name: "Coca Cola",
        price: 15000,
        category: "Đồ uống",
        image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=500",
        description: "Nước giải khát có gas.",
        isSoldOut: false
    },
    {
        name: "Phở Bò Kobe",
        price: 850000,
        category: "Món chính",
        image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=500",
        description: "Thịt bò Kobe thượng hạng thái lát mỏng.",
        isSoldOut: false
    },
    {
        name: "Gỏi cuốn tôm thịt",
        price: 65000,
        category: "Khai vị",
        image: "https://images.unsplash.com/photo-1539136788836-5699e78bab75?q=80&w=500",
        description: "Món khai vị truyền thống Việt Nam.",
        isSoldOut: false
    },
    {
        name: "Bò bít tết Wagyu",
        price: 1200000,
        category: "Món chính",
        image: "https://images.unsplash.com/photo-1546241072-48010ad2862c?q=80&w=500",
        description: "Thịt bò Wagyu mềm tan trong miệng.",
        isSoldOut: false
    },
    {
        name: "Sashimi tổng hợp",
        price: 450000,
        category: "Khai vị",
        image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=500",
        description: "Các loại cá tươi sống từ Nhật Bản.",
        isSoldOut: false
    }
];

const tableData = [
    { tableId: "01", status: "Trống" },
    { tableId: "02", status: "Trống" },
    { tableId: "03", status: "Đang dùng", pin: "123456" },
    { tableId: "04", status: "Trống" },
    { tableId: "05", status: "Chờ thanh toán", pin: "5678" },
    { tableId: "06", status: "Trống" },
    { tableId: "07", status: "Trống" },
    { tableId: "08", status: "Trống" }
];

const userData = [
    { username: "admin", password: "123", role: "admin" },
    { username: "quanly", password: "123", role: "manager" },
    { username: "daubep", password: "123", role: "chef" },
    { username: "nhanvien1", password: "123", role: "manager" },
    { username: "nhanvien2", password: "123", role: "chef" }
];

const reservationData = [
    {
        guestName: "Nguyễn Văn A",
        email: "vana@gmail.com",
        phone: "0901234567",
        date: "2024-03-25",
        time: "19:00",
        guests: 4,
        notes: "Gần cửa sổ, tổ chức sinh nhật",
        status: "Pending"
    },
    {
        guestName: "Trần Thị B",
        email: "thib@gmail.com",
        phone: "0912345678",
        date: "2024-03-26",
        time: "18:30",
        guests: 2,
        notes: "Không ăn được hành",
        status: "Confirmed"
    }
];

const seedData = async () => {
    try {
        console.log("⏳ Đang kết nối tới MongoDB để seed dữ liệu...");
        await mongoose.connect(MONGODB_URI);
        console.log("✅ Kết nối thành công!");

        console.log("Sweep old data...");
        await User.deleteMany({});
        await Menu.deleteMany({});
        await Table.deleteMany({});
        await Reservation.deleteMany({});

        console.log("🌱 Inserting Menu...");
        await Menu.insertMany(menuData);

        console.log("🌱 Inserting Tables...");
        await Table.insertMany(tableData);

        console.log("🌱 Inserting Users...");
        await User.insertMany(userData);

        console.log("🌱 Inserting Reservations...");
        await Reservation.insertMany(reservationData);

        console.log("✅ Seed Data Completed Successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seed Error:", error.message);
        process.exit(1);
    }
};

seedData();
