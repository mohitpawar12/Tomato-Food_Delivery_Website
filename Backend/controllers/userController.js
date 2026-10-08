import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator";

// Create JWT token with fallback check
const createToken = (id) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is missing from environment variables.");
    }
    return jwt.sign({ id }, secret);
};

// User login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({
                success: false,
                message: "User doesn't exist"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = createToken(user._id);

        res.json({
            success: true,
            token
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.json({
            success: false,
            message: "Error signing in"
        });
    }
};

// User registration
const registerUser = async (req, res) => {
    try {
        const { name, password, email } = req.body;

        // Checking if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }

        // Validating email format
        if (!validator.isEmail(email)) {
            return res.json({
                success: false,
                message: "Please enter a valid Email"
            });
        }

        // Check password length
        if (password.length < 8) {
            return res.json({
                success: false,
                message: "Please enter a strong password (minimum 8 characters)"
            });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,
            cartData: {} // Ensure empty object default
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({
            success: true,
            token
        });

    } catch (error) {
        console.error("Registration Error:", error);
        res.json({
            success: false,
            message: "Error registering user"
        });
    }
};

// Add food to cart
const addToCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        res.json({
            success: true,
            message: "Added To Cart"
        });

    } catch (error) {
        console.error("AddToCart Error:", error);
        res.json({
            success: false,
            message: "Error updating cart"
        });
    }
};

// Remove food from cart
const removeFromCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });

        res.json({
            success: true,
            message: "Removed From Cart"
        });

    } catch (error) {
        console.error("RemoveFromCart Error:", error);
        res.json({
            success: false,
            message: "Error removing from cart"
        });
    }
};

// Get cart
const getCart = async (req, res) => {
    try {
        const userData = await userModel.findById(req.body.userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {};

        res.json({
            success: true,
            cartData
        });

    } catch (error) {
        console.error("GetCart Error:", error);
        res.json({
            success: false,
            message: "Error retrieving cart"
        });
    }
};

export {
    loginUser,
    registerUser,
    addToCart,
    removeFromCart,
    getCart
};