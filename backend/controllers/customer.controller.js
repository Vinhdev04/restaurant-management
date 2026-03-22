const Table = require('../models/Table.model');
const Order = require('../models/Order.model');

// 1. Kiểm tra mã PIN của bàn hoặc PIN hệ thống
const verifyPin = async (req, res) => {
    try {
        const { pin } = req.body;
        
        // 1. Kiểm tra PIN hệ thống (cho Tablet chung)
        if (pin === '123456' || pin === '666888') {
            return res.status(200).json({ message: "Mở Tablet thành công!", type: 'GENERAL' });
        }

        // 2. Kiểm tra PIN riêng của từng bàn
        const table = await Table.findOne({ pin, status: { $in: ['Đang dùng', 'Chờ thanh toán'] } });
        if (table) {
            return res.status(200).json({ message: "Mở bàn thành công!", tableId: table.tableId, type: 'TABLE' });
        }

        res.status(401).json({ message: "Mã PIN không đúng hoặc bàn chưa được nhân viên mở!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

// 2. Đặt món ăn
const placeOrder = async (req, res) => {
    try {
        const { tableId, items, pin } = req.body;
        
        // Kiểm tra xem bàn có đang mở không
        const table = await Table.findOne({ tableId });
        if (!table) return res.status(404).json({ message: "Không tìm thấy bàn!" });

        // Nếu bàn đang 'Đang dùng' hoặc 'Chờ thanh toán', yêu cầu mã PIN
        if (table.status !== 'Trống') {
            if (!pin || table.pin !== pin) {
                return res.status(401).json({ message: "Mã PIN không đúng hoặc thiếu mã PIN để gọi món!" });
            }
        } else {
            // Nếu bàn đang trống mà khách tự gọi, tự động mở bàn (hoặc báo lỗi tùy quy trình)
            // Ở đây ta báo lỗi yêu cầu nhân viên mở bàn trước để đảm bảo quy trình
            return res.status(400).json({ message: "Bàn chưa được mở. Vui lòng liên hệ nhân viên để mở bàn!" });
        }

        const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const newOrder = new Order({ tableId, items, totalAmount });
        await newOrder.save();

        // Phát tín hiệu Real-time cho Bếp và Quản lý
        const io = req.app.get('socketio');
        
        // Gửi cho bếp để chế biến
        io.emit('NEW_ORDER_RECEIVED', newOrder);

        // Gửi thông báo hệ thống cho Admin/Manager
        io.emit('NOTIFICATION', {
            type: 'NEW_ORDER',
            message: `Bàn ${tableId} vừa đặt món mới!`,
            time: new Date()
        });

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
        const { tableId, paymentMethod } = req.body;
        
        // Tìm tất cả đơn hàng chưa thanh toán của bàn này
        const orders = await Order.find({ tableId, paymentStatus: 'Chưa thanh toán' });
        if (orders.length === 0) return res.status(404).json({ message: "Không tìm thấy đơn hàng cần thanh toán!" });

        // Cập nhật tất cả đơn hàng sang trạng thái Yêu cầu thanh toán
        await Order.updateMany(
            { tableId, paymentStatus: 'Chưa thanh toán' },
            { paymentStatus: 'Yêu cầu thanh toán', paymentMethod: paymentMethod || 'CASH' }
        );

        // Cập nhật trạng thái bàn
        await Table.findOneAndUpdate({ tableId }, { status: 'Chờ thanh toán' });

        // Phát tín hiệu cho Quản lý
        const io = req.app.get('socketio');
        io.emit('PAYMENT_REQUESTED', { tableId });

        // Gửi thông báo hệ thống
        io.emit('NOTIFICATION', {
            type: 'PAYMENT_REQUEST',
            message: `Bàn ${tableId} đang yêu cầu thanh toán (${paymentMethod === 'BANK_TRANSFER' ? 'Chuyển khoản' : 'Tiền mặt'})!`,
            time: new Date()
        });

        res.status(200).json({ message: "Đã gửi yêu cầu thanh toán!" });
    } catch (error) {
        console.error("Lỗi requestPayment:", error);
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

module.exports = {
    verifyPin,
    placeOrder,
    getOrdersByTable,
    requestPayment
};
