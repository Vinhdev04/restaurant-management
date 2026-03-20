const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    tableId: { type: String, required: true },
    items: [
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
            status: { type: String, enum: ['Đang chờ', 'Đang chế biến', 'Hoàn thành'], default: 'Đang chờ' }
        }
    ],
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Chưa thanh toán', 'Yêu cầu thanh toán', 'Đã thanh toán'], default: 'Chưa thanh toán' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
