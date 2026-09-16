const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const bcrypt = require("bcrypt");

const products = require("./products");
const Product = require("./models/Product");
const Order = require("./models/Order");
const Cart = require("./models/Cart");
const User = require("./models/User");


const app = express();

app.use(cors());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });

app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("Nova Cart Backend is running!");
});

app.post("/api/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingUser =
            await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user =
            new User({
                name: name,
                email: email,
                password: hashedPassword
            });

        await user.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Registration failed",
            error: error.message
        });

    }

});

app.post("/api/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user =
            await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        res.status(500).json({
            message: "Login failed",
            error: error.message
        });

    }

});

// Products API
app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();

        res.json(products);
    } catch (error) {
        res.status(500).json({
            message: "Error fetching products",
            error: error.message
        });
    }
});
app.post("/api/products/seed", async (req, res) => {
    try {
        await Product.deleteMany();
        await Product.insertMany(products);

        res.json({
            message: "Products added to MongoDB successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding products",
            error: error.message
        });
    }
});
// Create Order API
app.post("/api/orders", async (req, res) => {
    try {

        const order = new Order(req.body);

        const savedOrder = await order.save();

       // Clear user's cart after successful order

await Cart.deleteOne(
    {
        userId: req.body.userId
    }
);

        res.status(201).json({
            message: "Order created successfully",
            order: savedOrder
        });

    } catch (error) {

        res.status(500).json({
            message: "Error creating order",
            error: error.message
        });

    }
});
// Get All Orders API
app.get("/api/orders", async (req, res) => {
    try {

        const orders = await Order.find({
            userId: req.query.userId
        });

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching orders",
            error: error.message
        });

    }
});

// Get Single Order API
app.get("/api/orders/:orderNumber", async (req, res) => {
    try {

        const order = await Order.findOne({
            orderNumber: Number(req.params.orderNumber)
        });

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.json(order);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching order",
            error: error.message
        });

    }
});

// Get Cart
app.get("/api/cart/:userId", async (req, res) => {
    try {

        const cart = await Cart.findOne({
            userId: req.params.userId
        });

        if (!cart) {
            return res.json({
                userId: req.params.userId,
                items: [],
                total: 0
            });
        }

        res.json(cart);

    } catch (error) {

        res.status(500).json({
            message: "Error fetching cart",
            error: error.message
        });

    }
});

// Add Item to Cart
app.post("/api/cart/:userId", async (req, res) => {
    try {

        const { product, quantity } = req.body;

        let cart = await Cart.findOne({
            userId: req.params.userId
        });

        if (!cart) {

            cart = new Cart({
                userId: req.params.userId,
                items: [],
                total: 0
            });

        }

        const existingItem = cart.items.find(
            item => item.id === product.id
        );

        if (existingItem) {

            existingItem.quantity += quantity;

        } else {

            cart.items.push({
                ...product,
                quantity: quantity
            });

        }

        cart.total = cart.items.reduce(
            (sum, item) =>
                sum + (item.price * item.quantity),
            0
        );

        await cart.save();

        res.json({
            message: "Item added to cart",
            cart: cart
        });

    } catch (error) {

        res.status(500).json({
            message: "Error adding item to cart",
            error: error.message
        });

    }
});

// Update Cart
app.put("/api/cart/:userId", async (req, res) => {
    try {

        const { items } = req.body;

        const cart = await Cart.findOneAndUpdate(
            {
                userId: req.params.userId
            },
            {
                items: items,
                total: items.reduce(
                    (sum, item) =>
                        sum +
                        (Number(item.price) * Number(item.quantity)),
                    0
                )
            },
            {
                new: true,
                upsert: true
            }
        );

        if (!cart) {

            return res.status(404).json({
                message: "Cart not found"
            });

        }

        res.json({
            message: "Cart updated successfully",
            cart: cart
        });

    } catch (error) {

        res.status(500).json({
            message: "Error updating cart",
            error: error.message
        });

    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});