const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({

    userId: {
        type: String,
        required: true
    },

    orderNumber: {
        type: Number,
        required: true,
        unique: true
    },

    customerName: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },

    pincode: {
        type: String,
        required: true
    },

    paymentMethod: {
        type: String,
        required: true
    },

    items: {
        type: Array,
        requird: true
    },

    total: {
        type: Number,
        required: true
    },

    date: {
        type: String,
        required: true
    }

});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;