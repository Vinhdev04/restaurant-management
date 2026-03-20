const Table = require('../models/Table.model');
const Order = require('../models/Order.model');

// 1. Kiểm tra mã PIN của bàn
const verifyPin = async (req, res) => {
    try {
        const { pin } = req.body;
        const table = await Table.findOne({ pin });
        if (!table) return res.status(401).json({ message: "Mã PIN không đúng!" });
        res.status(200).json({ message: "Mở bàn thành công!", tableId: table.tableId });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

// 2. Đặt món ăn
const placeOrder = async (req, res) => {
    try {
        const { tableId, items } = req.body;
        const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const newOrder = new Order({ tableId, items, totalAmount });
        await newOrder.save();

        // Phát tín hiệu Real-time cho Bếp
        const io = req.app.get('socketio');
        io.emit('NEW_ORDER_RECEIVED', newOrder);

        res.status(201).json({ message: "Đặt món thành công!", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi đặt món!" });
    }
};

// 3. Lấy danh sách đơn hàng của bàn (Theo dõi)
const getOrdersByTable = async (req, res) => {
    try {
        const { tableId } = req.params;
        const orders = await Order.find({ tableId, paymentStatus: { $ne: 'Đã thanh toán' } });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

// 4. Yêu cầu thanh toán
const requestPayment = async (req, res) => {
    try {
        const { tableId } = req.body;
        const order = await Order.findOne({ tableId, paymentStatus: 'Chưa thanh toán' }).sort({ createdAt: -1 });
        if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng cần thanh toán!" });

        order.paymentStatus = 'Yêu cầu thanh toán';
        await order.save();

        // Cập nhật trạng thái bàn
        await Table.findOneAndUpdate({ tableId }, { status: 'Chờ thanh toán' });

        // Phát tín hiệu cho Quản lý
        const io = req.app.get('socketio');
        io.emit('PAYMENT_REQUESTED', { tableId, orderId: order._id });

        res.status(200).json({ message: "Đã gửi yêu cầu thanh toán!", order });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

module.exports = {
    verifyPin,
    placeOrder,
    getOrdersByTable,
    requestPayment
};
