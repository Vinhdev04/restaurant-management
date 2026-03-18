const mongoose = require('mongoose');

// Khai báo cấu trúc dữ liệu cho Đơn hàng
const orderSchema = new mongoose.Schema({
    tableId: {
        type: String,
        required: true // Bắt buộc phải biết đơn này từ Bàn nào (VD: "BAN_05")
    },
    customerPhone: {
        type: String,
        default: null // Khách có thể nhập để tích điểm, hoặc bỏ qua cũng không sao
    },
    items: [{
        menuItemId: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        
        // ĐÃ BỔ SUNG: Bắt buộc phải có giá tiền để lúc trừ món không bị tính ra 0đ
        price: { type: Number, required: true }, 

        note: { type: String, default: "" }, // Ghi chú: "Ít cay", "Không hành"
        status: {
            type: String,
            // ĐÃ BỔ SUNG: Trạng thái 'Hết món'
            enum: ['Chờ tiếp nhận', 'Đang nấu', 'Hoàn thành', 'Hết món'], 
            default: 'Chờ tiếp nhận'
        }
    }],
    orderStatus: {
        type: String,
        enum: ['Đang chế biến', 'Hoàn thành'],
        default: 'Đang chế biến'
    },
    totalAmount: {
        type: Number,
        default: 0 // Tổng tiền hóa đơn
    },
    paymentStatus: {
        type: String,
        enum: ['Chưa thanh toán', 'Chờ thanh toán', 'Đã thanh toán', 'Đã thanh toán (chờ xác thực)'], 
        default: 'Chưa thanh toán'
    },
    paymentMethod: {
        type: String,
        enum: ['CASH', 'BANK_TRANSFER', 'VNPAY', null],
        default: null
    },
    paymentRequestedAt: {
        type: Date,
        default: null
    },
    paymentConfirmedAt: {
        type: Date,
        default: null
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Order', orderSchema);