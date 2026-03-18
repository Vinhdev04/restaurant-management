const mongoose = require('mongoose');

// Khai báo cấu trúc dữ liệu cho Khách hàng
const customerSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true, // Rất quan trọng: Số điện thoại không được trùng nhau
    },
    point: {
        type: Number,
        default: 0 // Điểm mặc định khi khách mới nhập SĐT lần đầu là 0
    }
}, { 
    timestamps: true // Tự động lưu thời gian tạo (createdAt) và thời gian cập nhật (updatedAt)
});

module.exports = mongoose.model('Customer', customerSchema);