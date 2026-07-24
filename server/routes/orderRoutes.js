const express = require("express");
const router = express.Router();
const { createOrder, createRazorpayOrder, verifyRazorpayPayment, getMyOrders, getAllOrders } = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

router.post("/", protect, createOrder);
router.post("/razorpay", protect, createRazorpayOrder);
router.post("/razorpay/verify", protect, verifyRazorpayPayment);
router.get("/my", protect, getMyOrders);
router.get("/", protect, admin, getAllOrders);

module.exports = router;
