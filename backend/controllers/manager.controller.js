const Order = require('../models/Order.model');
const Customer = require('../models/Customer.model');
const Table = require('../models/Table.model');

const getPendingPayments = async (req, res) => {
    try {
        const orders = await Order.find({ paymentStatus: { $in: ['Chờ thanh toán', 'Đã thanh toán (chờ xác thực)'] } }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) { res.status(500).json({ message: "Lỗi!" }); }
};

const confirmPayment = async (req, res) => {
    try {
        const { orderId, paymentMethod } = req.body;
        const baseOrder = await Order.findById(orderId);
        if (!baseOrder) return res.status(404).json({ message: "Không tìm thấy đơn hàng!" });

        const tableId = baseOrder.tableId;
        const orders = await Order.find({ tableId, paymentStatus: { $in: ['Chưa thanh toán', 'Chờ thanh toán'] } });

        let totalCombined = 0;
        for (const order of orders) {
            // Tính lại tiền, trừ các món 'Hết món'
            order.totalAmount = order.items.reduce((sum, item) => item.status !== 'Hết món' ? sum + (item.price || 0) * item.quantity : sum, 0);
            totalCombined += order.totalAmount;
            order.paymentStatus = 'Đã thanh toán';
            await order.save();
        }

        // TỰ ĐỘNG TÁCH BÀN NẾU LÀ BÀN GHÉP
        if (tableId.includes(' & ')) {
            const tableNames = tableId.split(' & ');
            for (const name of tableNames) {
                await Table.findOneAndUpdate({ tableId: name }, { status: 'Trống', unlockCode: null }, { upsert: true });
            }
            await Table.findOneAndDelete({ tableId }); // Xóa tên bàn ghép
        } else {
            await Table.findOneAndUpdate({ tableId }, { status: 'Trống', unlockCode: null });
        }

        const io = req.app.get('socketio');
        if (io) io.emit('PAYMENT_CONFIRMED', { tableId });
        res.status(200).json({ message: "Xác nhận thanh toán và dọn bàn thành công!" });
    } catch (error) { res.status(500).json({ message: "Lỗi!" }); }
};

const mergeTables = async (req, res) => { // (Giữ nguyên hàm mergeTables cũ của bạn ở đây)
    try {
        const { table1, table2 } = req.body;
        const t1 = await Table.findOne({ tableId: table1 });
        const t2 = await Table.findOne({ tableId: table2 });
        if (!t1 || !t2 || t1.status !== 'Trống' || t2.status !== 'Trống') return res.status(400).json({ message: "Chỉ ghép bàn TRỐNG!" });

        const mergedTableId = `${table1} & ${table2}`;
        const pin = Math.floor(100000 + Math.random() * 900000).toString();
        await new Table({ tableId: mergedTableId, status: 'Đang phục vụ', unlockCode: pin }).save();
        await Table.findByIdAndDelete(t1._id);
        await Table.findByIdAndDelete(t2._id);
        
        const io = req.app.get('socketio');
        if (io) io.emit('NEW_ORDER_RECEIVED', { tableId: mergedTableId });
        res.status(200).json({ message: `Ghép bàn thành công!`, tableId: mergedTableId, unlockCode: pin });
    } catch (error) { res.status(500).json({ message: "Lỗi!" }); }
};

// HÀM MỚI: Tách bàn thủ công
const unmergeTable = async (req, res) => {
    try {
        const { tableId } = req.body;
        if (!tableId.includes(' & ')) return res.status(400).json({ message: "Đây không phải bàn ghép!" });

        const tableNames = tableId.split(' & ');
        for (const name of tableNames) {
            await new Table({ tableId: name, status: 'Trống' }).save();
        }
        await Table.findOneAndDelete({ tableId });

        const io = req.app.get('socketio');
        if (io) io.emit('NEW_ORDER_RECEIVED', { tableId: 'REFRESH' }); // Load lại sơ đồ
        res.status(200).json({ message: "Đã tách bàn thành công!" });
    } catch (error) { res.status(500).json({ message: "Lỗi!" }); }
};

const getAllTables = async (req, res) => {
    try {
        const tables = await Table.find().sort({ tableId: 1 });
        res.status(200).json(tables);
    } catch (error) { res.status(500).json({ message: "Lỗi khi lấy danh sách bàn!" }); }
};

const openTable = async (req, res) => {
    try {
        const { tableId } = req.body;
        const pin = Math.floor(100000 + Math.random() * 900000).toString();
        const table = await Table.findOneAndUpdate({ tableId }, { status: 'Đang phục vụ', unlockCode: pin }, { new: true });
        res.status(200).json({ message: "Mở bàn thành công!", tableId: table.tableId, unlockCode: pin });
    } catch (error) { res.status(500).json({ message: "Lỗi hệ thống khi mở bàn!" }); }
};

module.exports = { getPendingPayments, confirmPayment, mergeTables, unmergeTable, getAllTables, openTable };