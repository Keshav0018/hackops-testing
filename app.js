// app.js
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const path = require("path");
const cors = require("cors");

const app = express();

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// --- CORS setup ---
app.use(
  cors({
    origin: "http://127.0.0.1:3000", // frontend origin (can be port 5500 if using live server)
    credentials: true, // allow cookies to be sent
  })
);

// Routes
app.use("/api/v1/users", userRouter);

// Catch-all route for 404
app.all(/.*/, (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

module.exports = app;
