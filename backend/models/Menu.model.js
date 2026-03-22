const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String },
    description: { type: String },
    isSoldOut: { type: Boolean, default: false },
    options: [{
        name: String,
        price: Number
    }],
    recommendations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }]
});

module.exports = mongoose.model('Menu', menuSchema);
