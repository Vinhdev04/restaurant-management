const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
    tableId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    status: { 
        type: String, 
        enum: ['Trống', 'Đang phục vụ', 'Chờ thanh toán'], 
        default: 'Trống' 
    },
    currentOrderId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Order', 
        default: null 
    },
    // TRƯỜNG MỚI THÊM: Lưu mã PIN 6 số để mở khóa Tablet
    unlockCode: {
        type: String,
        default: null
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Table', tableSchema);