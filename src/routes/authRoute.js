const AuthController = require("../controllers/authController");
const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../middlewares/authMiddleware");

router.post("/register", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.get("/isUserLoggedIn", AuthController.isUserLoggedIn);
router.post("/logout", AuthMiddleware.isAuthenticated, AuthController.logOut);

module.exports = router;
