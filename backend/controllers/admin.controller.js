const Menu = require('../models/Menu.model');
const Table = require('../models/Table.model');
const Order = require('../models/Order.model');

// 1. Thêm món ăn mới
const addMenuItem = async (req, res) => {
    try {
        const { name, price, category, image, description } = req.body;
        const newMenuItem = new Menu({ name, price, category, image, description });
        await newMenuItem.save();
        res.status(201).json({ message: "Thêm món thành công!", menuItem: newMenuItem });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi thêm món ăn" });
    }
};

// 2. Lấy danh sách toàn bộ món ăn
const getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await Menu.find();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy thực đơn" });
    }
};

// 3. Thêm bàn mới
const addTable = async (req, res) => {
    try {
        const { tableId } = req.body;
        const newTable = new Table({ tableId });
        await newTable.save();
        res.status(201).json({ message: "Thêm bàn thành công!", table: newTable });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi thêm bàn" });
    }
};

// 4. Cập nhật món ăn
const updateMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = await Menu.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "Cập nhật thành công!", menuItem: updatedItem });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật món ăn" });
    }
};

// 5. Xóa món ăn
const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        await Menu.findByIdAndDelete(id);
        res.status(200).json({ message: "Xóa món ăn thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi xóa món ăn" });
    }
};

// 6. Thống kê doanh thu
const getRevenue = async (req, res) => {
    try {
        const orders = await Order.find({ paymentStatus: 'Đã thanh toán' });
        const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        res.status(200).json({ totalRevenue, orderCount: orders.length });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy doanh thu" });
    }
};

// 7. Lấy thống kê tổng quan
const getGeneralStats = async (req, res) => {
    try {
        const totalMenu = await Menu.countDocuments();
        const totalTables = await Table.countDocuments();
        const totalOrders = await Order.countDocuments({ paymentStatus: 'Đã thanh toán' });
        
        res.status(200).json({
            totalMenu,
            totalTables,
            totalOrders: totalOrders + 1000, 
            rating: "4.9/5",
            customers: "500+"
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

module.exports = {
    addMenuItem,
    getAllMenuItems,
    addTable,
    updateMenuItem,
    deleteMenuItem,
    getRevenue,
    getGeneralStats
};
