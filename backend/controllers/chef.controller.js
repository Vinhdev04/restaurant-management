const Order = require('../models/Order.model');
const Menu = require('../models/Menu.model');

// 1. Lấy danh sách món đang chờ chế biến
const getPendingOrders = async (req, res) => {
    try {
        const orders = await Order.find({ 
            "items.status": { $in: ['Đang chờ', 'Đang chế biến'] },
            paymentStatus: { $ne: 'Đã thanh toán' }
        }).sort({ createdAt: 1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

// 2. Lấy danh sách món đã hoàn thành (trong ngày)
const getCompletedOrders = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const orders = await Order.find({
            "items.status": 'Hoàn thành',
            createdAt: { $gte: today }
        }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

// 3. Cập nhật trạng thái món ăn
const updateItemStatus = async (req, res) => {
    try {
        const { orderId, itemId, status } = req.body;
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng!" });

        const item = order.items.id(itemId);
        if (!item) return res.status(404).json({ message: "Không tìm thấy món ăn trong đơn!" });

        item.status = status;
        await order.save();

        // Phát tín hiệu Real-time cho Khách hàng
        const io = req.app.get('socketio');
        io.emit('ITEM_STATUS_UPDATED', { orderId, itemId, status, tableId: order.tableId });

        res.status(200).json({ message: "Cập nhật trạng thái thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

// 4. Bật/Tắt trạng thái hết hàng của món
const toggleMenuItemSoldOut = async (req, res) => {
    try {
        const { id, isSoldOut } = req.body;
        await Menu.findByIdAndUpdate(id, { isSoldOut });
        res.status(200).json({ message: "Cập nhật trạng thái món thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

module.exports = {
    getPendingOrders,
    getCompletedOrders,
    updateItemStatus,
    toggleMenuItemSoldOut
};
