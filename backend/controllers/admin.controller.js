const Menu = require('../models/Menu.model');
const Table = require('../models/Table.model');
const Order = require('../models/Order.model');
const User = require('../models/User.model');

// ============================================
// 1. QUẢN LÝ THỰC ĐƠN (MENU)
// ============================================

const addMenuItem = async (req, res) => {
    try {
        const { name, price, category, image, description } = req.body;
        if (!name || !price || !category) {
            return res.status(400).json({ message: "Vui lòng nhập đủ tên, giá và danh mục!" });
        }
        const newMenuItem = new Menu({ name, price, category, image, description });
        await newMenuItem.save();

        // Gửi thông báo Real-time
        const io = req.app.get('socketio');
        io.emit('NOTIFICATION', {
            type: 'MENU_UPDATE',
            message: `Món ăn mới "${name}" đã được thêm vào thực đơn!`,
            time: new Date()
        });

        res.status(201).json({ message: "Thêm món thành công!", menuItem: newMenuItem });
    } catch (error) {
        console.error("Lỗi addMenuItem:", error);
        res.status(500).json({ message: "Lỗi khi thêm món ăn", error: error.message });
    }
};

const getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await Menu.find().sort({ createdAt: -1 });
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy thực đơn" });
    }
};

const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = await Menu.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedItem) return res.status(404).json({ message: "Không tìm thấy món ăn!" });
        res.status(200).json({ message: "Cập nhật thành công!", menuItem: updatedItem });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật món ăn" });
    }
};

const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Menu.findByIdAndDelete(id);
        if (!deletedItem) return res.status(404).json({ message: "Không tìm thấy món ăn!" });
        res.status(200).json({ message: "Xóa món ăn thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa món ăn" });
    }
};

// ============================================
// 2. QUẢN LÝ NHÂN VIÊN (STAFF)
// ============================================

const getAllStaff = async (req, res) => {
    try {
        const staff = await User.find({ role: { $in: ['manager', 'chef'] } }).select('-password');
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy danh sách nhân viên" });
    }
};

const addStaff = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        if (!username || !password || !role) {
            return res.status(400).json({ message: "Vui lòng nhập đủ thông tin nhân viên!" });
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ message: "Tên đăng nhập đã tồn tại!" });

        const newStaff = new User({ username, password, role });
        await newStaff.save();

        // Gửi thông báo phân bổ nhân sự
        const io = req.app.get('socketio');
        io.emit('NOTIFICATION', {
            type: 'STAFF_ASSIGN',
            message: `Nhân viên mới "${username}" vừa được phân bổ vào hệ thống với vai trò ${role}!`,
            time: new Date()
        });

        res.status(201).json({ message: "Thêm nhân viên thành công!", staff: { username, role } });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi thêm nhân viên" });
    }
};

const updateStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const { password, role } = req.body;
        const updateData = { role };
        if (password) updateData.password = password;

        const updatedStaff = await User.findByIdAndUpdate(id, updateData, { new: true }).select('-password');
        if (!updatedStaff) return res.status(404).json({ message: "Không tìm thấy nhân viên!" });
        res.status(200).json({ message: "Cập nhật nhân viên thành công!", staff: updatedStaff });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật nhân viên" });
    }
};

const deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStaff = await User.findByIdAndDelete(id);
        if (!deletedStaff) return res.status(404).json({ message: "Không tìm thấy nhân viên!" });
        res.status(200).json({ message: "Xóa nhân viên thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa nhân viên" });
    }
};

// ============================================
// 3. QUẢN LÝ BÀN (TABLES)
// ============================================

const addTable = async (req, res) => {
    try {
        const { tableId } = req.body;
        if (!tableId) return res.status(400).json({ message: "Thiếu mã bàn!" });
        const newTable = new Table({ tableId });
        await newTable.save();
        res.status(201).json({ message: "Thêm bàn thành công!", table: newTable });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi thêm bàn" });
    }
};

// ============================================
// 4. THỐNG KÊ (STATS)
// ============================================

const getRevenue = async (req, res) => {
    try {
        const orders = await Order.find({ paymentStatus: 'Đã thanh toán' });
        const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        res.status(200).json({ totalRevenue, orderCount: orders.length });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy doanh thu" });
    }
};

const getGeneralStats = async (req, res) => {
    try {
        const totalMenu = await Menu.countDocuments();
        const totalTables = await Table.countDocuments();
        const totalStaff = await User.countDocuments({ role: { $in: ['manager', 'chef'] } });
        
        // Tính doanh thu thực tế từ Order
        const paidOrders = await Order.find({ paymentStatus: 'Đã thanh toán' });
        const actualRevenue = paidOrders.reduce((sum, order) => sum + (order.totalAmount || 0), 0);
        const totalOrders = paidOrders.length;

        // Thống kê doanh thu theo tháng thực tế (Aggregation)
        const revenueByMonthRaw = await Order.aggregate([
            { $match: { paymentStatus: 'Đã thanh toán' } },
            { $group: {
                _id: { $month: "$createdAt" },
                total: { $sum: "$totalAmount" }
            }},
            { $sort: { "_id": 1 } }
        ]);

        const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'];
        const revenueByMonth = months.map((m, index) => {
            const found = revenueByMonthRaw.find(r => r._id === (index + 1));
            return { month: m, amount: found ? found.total / 1000000 : 0 }; // Đơn vị triệu đồng
        }).slice(0, new Date().getMonth() + 1); // Chỉ lấy đến tháng hiện tại

        // Thống kê danh mục phổ biến
        const popularCategoriesRaw = await Menu.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);

        // Thống kê món ăn bán chạy nhất
        const topItemsRaw = await Order.aggregate([
            { $match: { paymentStatus: 'Đã thanh toán' } },
            { $unwind: "$items" },
            { $group: {
                _id: "$items.menuItemId",
                count: { $sum: "$items.quantity" }
            }},
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        res.status(200).json({
            totalMenu,
            totalTables,
            totalOrders,
            totalRevenue: actualRevenue,
            totalStaff,
            revenueByMonth,
            popularCategories: popularCategoriesRaw.map(c => ({ name: c._id, value: c.count })),
            topItems: topItemsRaw.map((item, index) => ({
                rank: index + 1,
                name: item._id,
                orders: `${item.count} món`
            }))
        });
    } catch (error) {
        console.error("Lỗi getGeneralStats:", error);
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

module.exports = {
    addMenuItem,
    getAllMenuItems,
    updateMenuItem,
    deleteMenuItem,
    getAllStaff,
    addStaff,
    updateStaff,
    deleteStaff,
    addTable,
    getRevenue,
    getGeneralStats
};
