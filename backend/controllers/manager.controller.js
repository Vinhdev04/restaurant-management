const Table = require('../models/Table.model');
const Order = require('../models/Order.model');
const Menu = require('../models/Menu.model');

// 1. Lấy danh sách toàn bộ bàn
const getAllTables = async (req, res) => {
    try {
        const tables = await Table.find().sort({ tableId: 1 });
        res.status(200).json(tables);
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

// 2. Mở bàn và cấp mã PIN cho khách
const openTable = async (req, res) => {
    try {
        const { tableId } = req.body;
        const pin = Math.floor(100000 + Math.random() * 900000).toString();
        
        const table = await Table.findOneAndUpdate(
            { tableId },
            { status: 'Đang dùng', pin },
            { new: true }
        );

        // Trả về tableId và pin để FE hiển thị đúng
        res.status(200).json({ 
            message: "Đã mở bàn thành công!", 
            tableId: table.tableId, 
            pin: table.pin 
        });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

// 3. Lấy danh sách các đơn hàng chờ thanh toán
const getPendingPayments = async (req, res) => {
    try {
        const orders = await Order.find({ paymentStatus: 'Yêu cầu thanh toán' }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

// 4. Xác nhận thanh toán
const confirmPayment = async (req, res) => {
    try {
        const { orderId, paymentMethod } = req.body;
        const order = await Order.findById(orderId);
        if (!order) return res.status(404).json({ message: "Không tìm thấy đơn hàng!" });

        order.paymentStatus = 'Đã thanh toán';
        await order.save();

        // Giải phóng bàn
        await Table.findOneAndUpdate(
            { tableId: order.tableId },
            { status: 'Trống', pin: null }
        );

        // Phát tín hiệu Real-time
        const io = req.app.get('socketio');
        io.emit('PAYMENT_CONFIRMED', { tableId: order.tableId, orderId });

        res.status(200).json({ message: "Thanh toán hoàn tất!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

// 5. Gộp bàn
const mergeTables = async (req, res) => {
    try {
        const { table1, table2 } = req.body; // Gộp bàn 2 vào bàn 1
        await Table.findOneAndUpdate({ tableId: table2 }, { status: 'Trống', pin: null });
        res.status(200).json({ message: `Đã gộp bàn ${table2} vào bàn ${table1}` });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

// 6. Tách bàn
const unmergeTable = async (req, res) => {
    try {
        const { tableId } = req.body;
        await Table.findOneAndUpdate({ tableId }, { status: 'Trống', pin: null });
        res.status(200).json({ message: "Đã tách bàn thành công!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

// 7. Bật/Tắt trạng thái hết hàng của món
const toggleMenuItemSoldOut = async (req, res) => {
    try {
        const { id, isSoldOut } = req.body;
        const updatedItem = await Menu.findByIdAndUpdate(id, { isSoldOut }, { new: true });
        
        // Phát tín hiệu Real-time cho mọi người
        const io = req.app.get('socketio');
        io.emit('MENU_ITEM_UPDATED', updatedItem);

        res.status(200).json({ message: "Cập nhật trạng thái món thành công!", item: updatedItem });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

// 8. Reset toàn bộ trạng thái hết hàng
const resetAllMenuStatus = async (req, res) => {
    try {
        await Menu.updateMany({}, { isSoldOut: false });
        
        // Phát tín hiệu Real-time cho mọi người
        const io = req.app.get('socketio');
        io.emit('MENU_RESET_SUCCESS');

        res.status(200).json({ message: "Đã đặt lại toàn bộ trạng thái món ăn!" });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

// 9. Thêm món mới
const addMenuItem = async (req, res) => {
    try {
        const { name, price, category, image, description } = req.body;
        const newItem = new Menu({ name, price, category, image, description });
        await newItem.save();

        const io = req.app.get('socketio');
        io.emit('MENU_ITEM_ADDED', newItem);

        res.status(201).json({ message: "Thêm món thành công!", item: newItem });
    } catch (error) {
        res.status(500).json({ message: "Lỗi hệ thống!" });
    }
};

module.exports = {
    getAllTables,
    openTable,
    getPendingPayments,
    confirmPayment,
    mergeTables,
    unmergeTable,
    toggleMenuItemSoldOut,
    resetAllMenuStatus,
    addMenuItem
};
