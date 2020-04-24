const express = require('express');
const router = express.Router();
const {startPayment, verifyPayment, gatewayOnline} = require('./controller');
router.post('/start/:order_hash', startPayment);
router.get('/start/:gateway/:order', gatewayOnline);
router.post('/verify/:payment_hash', verifyPayment);
router.get('/verify/:payment_hash', verifyPayment);

module.exports = router;
