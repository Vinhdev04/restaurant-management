const Order = require('../models/Order.model');
const Table = require('../models/Table.model');

// 1. Khách hàng đặt món
const placeOrder = async (req, res) => {
    try {
        const { tableId, customerPhone, items } = req.body;
        if (!tableId || !items || items.length === 0) {
            return res.status(400).json({ message: "Vui lòng chọn bàn và chọn ít nhất 1 món ăn!" });
        }

        const totalAmount = items.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

        const newOrder = new Order({ tableId, customerPhone, items, totalAmount, orderStatus: 'Đang chế biến' });
        await newOrder.save();

        const io = req.app.get('socketio');
        if (io) {
            io.emit('NEW_ORDER_RECEIVED', newOrder);
        }

        res.status(201).json({ message: "Đặt món thành công!", orderId: newOrder._id });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

// 2. Tìm lại các đơn đang chờ của 1 bàn
const getTableOrders = async (req, res) => {
    try {
        // Tìm các đơn của Bàn này mà trạng thái CHƯA hoàn tất thanh toán
        const orders = await Order.find({ 
            tableId: req.params.tableId, 
            paymentStatus: { $in: ['Chưa thanh toán', 'Chờ thanh toán', 'Đã thanh toán (chờ xác thực)'] }
        }).sort({ createdAt: -1 }); // Sắp xếp đơn mới nhất lên đầu
        
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

// 3. Lấy tất cả đơn hàng (Dành cho mục đích tra cứu)
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy đơn hàng" });
    }
};

// 4. Khách bấm "Yêu cầu thanh toán" trên Tablet
const requestPayment = async (req, res) => {
    try {
        // ĐÃ SỬA: Nhận thêm paymentMethod từ Frontend
        const { tableId, paymentMethod } = req.body; 
        if (!tableId) {
            return res.status(400).json({ message: "Thiếu mã bàn để thanh toán!" });
        }

        const orders = await Order.find({
            tableId,
            paymentStatus: { $in: ['Chưa thanh toán', 'Chờ thanh toán'] }
        }).sort({ createdAt: 1 });

        if (!orders || orders.length === 0) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng nào để thanh toán!" });
        }

        const allItemsCompleted = orders.every(order =>
            order.items.every(item => item.status === 'Hoàn thành' || item.status === 'Hết món')
        );
        if (!allItemsCompleted) {
            return res.status(400).json({ message: "Bếp chưa hoàn thành tất cả món. Vui lòng đợi!" });
        }

        let totalCombined = 0;
        for (const order of orders) {
            order.totalAmount = order.items.reduce((sum, item) => {
                return item.status !== 'Hết món' ? sum + (item.price || 0) * item.quantity : sum;
            }, 0);
            
            totalCombined += order.totalAmount;

            if (order.paymentStatus === 'Chưa thanh toán') {
                order.paymentStatus = 'Chờ thanh toán';
                order.paymentRequestedAt = new Date();
                // ĐÃ SỬA: Lưu lại hình thức thanh toán khách vừa chọn
                order.paymentMethod = paymentMethod || 'CASH'; 
            }
            await order.save();
        }

        const io = req.app.get('socketio');
        if (io) {
            io.emit('PAYMENT_REQUESTED', { tableId });
        }

        res.status(200).json({
            message: "Đã gửi yêu cầu thanh toán!",
            tableId,
            totalAmount: totalCombined,
            orders
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi gửi yêu cầu thanh toán!" });
    }
};

// 5. Khách nhập PIN vào Tablet để mở khóa
const verifyTabletPin = async (req, res) => {
    try {
        const { pin } = req.body; 
        
        // Tìm xem có bàn nào đang lưu cái mã PIN này không
        const table = await Table.findOne({ unlockCode: pin });

        if (!table) {
            return res.status(400).json({ message: "Mã PIN không chính xác hoặc đã hết hạn!" });
        }

        // Trả về tableId nếu PIN hợp lệ
        res.status(200).json({ 
            message: "✅ Mở khóa thành công!", 
            tableId: table.tableId 
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống khi xác thực PIN!" });
    }
};

module.exports = { 
    placeOrder, 
    getTableOrders, 
    getAllOrders, 
    requestPayment, 
    verifyTabletPin 
};