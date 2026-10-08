import foodModel from "../models/FoodModel.js";

// Add food
const addFood = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Food image is required"
            });
        }

        const food = new foodModel({
            name,
            description,
            price,
            category,
            image: req.file.filename
        });

        await food.save();

        res.json({
            success: true,
            message: "Food added successfully",
            data: food
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error adding food"
        });
    }
};


// Get all food
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});

        res.json({
            success: true,
            data: foods
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error fetching food"
        });
    }
};


// Remove food
const removeFood = async (req, res) => {
    try {
        await foodModel.findByIdAndDelete(req.body.id);

        res.json({
            success: true,
            message: "Food removed successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Error removing food"
        });
    }
};


export {
    addFood,
    listFood,
    removeFood
};