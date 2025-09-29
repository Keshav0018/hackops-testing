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

// --- CORS ---
// Allow frontend to send cookies cross-origin
app.use(
  cors({
    origin: "https://hackops-testing.onrender.com", // your deployed frontend URL
    credentials: true, // allow cookies
  })
);

// --- Routes ---
app.use("/api/v1/users", userRouter);

// --- Serve frontend static files ---
app.use(express.static(path.join(__dirname, "public")));

// Catch-all for client-side routing (optional)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Export app
module.exports = app;
