const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/auth/signup", authController.signup);
router.post("/auth/login", authController.login);

// Temprory :
router.get("/", authController.protect, authController.getAllUsers);

router.route("/").get((req, res) => {
  res.send("Hello from server");
});

module.exports = router;
