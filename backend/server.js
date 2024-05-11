import path from "path";

// Package import
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Routes
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

// Database Part
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

// Variables
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

// .env config
dotenv.config();

//app.get("/",(req,res)=>{
// root route http://localhost:8000/
//res.send("Hello chamindu");
//});

// Midlware
app.use(express.json()); // to parse the incoming requests with JSON payload (from req.body)
app.use(cookieParser());

// Routes Paths
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

//Adding Middleware
app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});
