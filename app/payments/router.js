const express = require("express");
const router = express.Router();
const controller = require("./controller");
router.post("/start/:order_hash", controller.startPayment);
router.post("/verify/:payment_hash", controller.verifyPayment);
router.get("/verify/:payment_hash", controller.verifyPayment);

module.exports = router;
