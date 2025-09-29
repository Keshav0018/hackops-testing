const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const path = require("path");
const cors = require("cors");

const app = express();

// --- Middleware ---
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// --- Routes ---
app.use("/api/v1/users", userRouter);

// --- Serve frontend static files ---
app.use(express.static(path.join(__dirname, "public")));

// --- Catch-all for frontend routing (after API routes) ---
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

module.exports = app;
