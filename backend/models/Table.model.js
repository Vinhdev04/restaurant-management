const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    tableId: { type: String, required: true, unique: true },
    status: { type: String, enum: ['Trống', 'Đang dùng', 'Chờ thanh toán'], default: 'Trống' },
    pin: { type: String, default: null }
});

module.exports = mongoose.model('Table', tableSchema);
