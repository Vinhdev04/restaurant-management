const Order = require('../models/Order.model');
const Menu = require('../models/Menu.model');

const isOrderAllItemsCompleted = (order) => order.items.every(item => item.status === "Hoàn thành" || item.status === "Hết món");

// 1. Hàm lấy tất cả các đơn hàng chưa hoàn thành (Để hiện lên màn hình bếp lúc mới mở)
const getPendingOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [ { orderStatus: { $ne: "Hoàn thành" } }, { orderStatus: { $exists: false }, "items.status": { $ne: "Hoàn thành" } } ]
        }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) { res.status(500).json({ message: "Lỗi!" }); }
};

// 2. Hàm cập nhật trạng thái cho MỘT MÓN ĂN
const updateItemStatus = async (req, res) => {
    try {
        const { orderId, itemId, status } = req.body; // status có thể là "Hoàn thành" hoặc "Hết món"

        const order = await Order.findOneAndUpdate(
            { "_id": orderId, "items._id": itemId },
            { "$set": { "items.$.status": status } },
            { new: true }
        );

        if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng!" });

        const io = req.app.get('socketio');
        if (io) {
            io.emit('ITEM_COMPLETED', { orderId, itemId, status }); // Gửi status mới xuống các máy

            if (isOrderAllItemsCompleted(order)) {
                const finalOrder = await Order.findByIdAndUpdate(
                    orderId, { $set: { orderStatus: "Hoàn thành" } }, { new: true }
                );
                io.emit('ORDER_COMPLETED', finalOrder || order);
            }
        }
        res.status(200).json({ message: `Đã cập nhật món thành: ${status}` });
    } catch (error) { res.status(500).json({ message: "Lỗi hệ thống!" }); }
};

// 3. Hàm lấy các đơn đã hoàn thành tất cả món (Dùng cho khu ĐƠN ĐÃ XONG của bếp)
const getCompletedOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [ { orderStatus: "Hoàn thành" }, { orderStatus: { $exists: false }, items: { $not: { $elemMatch: { status: { $nin: ["Hoàn thành", "Hết món"] } } } } } ]
        }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) { res.status(500).json({ message: "Lỗi!" }); }
};
const toggleItemAvailability = async (req, res) => {
    try {
        const { menuItemId, isAvailable } = req.body;
        await Menu.findByIdAndUpdate(menuItemId, { isAvailable }, { new: true });

        // Kích hoạt socket báo các Tablet tải lại menu
        const io = req.app.get('socketio');
        if (io) io.emit('MENU_UPDATED');

        res.status(200).json({ message: "Đã cập nhật trạng thái món!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi cập nhật món!" });
    }
};

module.exports = { updateItemStatus, getPendingOrders, getCompletedOrders,toggleItemAvailability };