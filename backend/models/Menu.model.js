const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    category: { 
        type: String, 
        enum: ['Khai vị', 'Món chính', 'Đồ uống', 'Tráng miệng'], 
        required: true 
    },
    image: { 
        type: String, 
        default: 'https://via.placeholder.com/150' // Ảnh mặc định nếu chưa up ảnh
    },
    isAvailable: { 
        type: Boolean, 
        default: true // True = Còn hàng, False = Hết món (Bếp sẽ bấm cái này)
    }
}, { 
    timestamps: true 
});

module.exports = mongoose.model('Menu', menuSchema);