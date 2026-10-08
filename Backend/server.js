import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

// Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// App Endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user",userRouter);


// Test route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Tomato API is working!"
    });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

