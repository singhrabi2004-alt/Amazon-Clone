const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },

    items: {
        type: Array,
        required: true
    },

    total: {
        type: Number,
        required: true
    }

});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;