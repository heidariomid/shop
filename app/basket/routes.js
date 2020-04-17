const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/', controller.index);
router.get('/add/:slug', controller.add);
router.get('/checkout', controller.checkout);

module.exports = router;