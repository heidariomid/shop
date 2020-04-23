const express = require('express');
const router = express.Router();
const {index, add, checkout} = require('./controller');

router.get('/', index);
router.get('/add/:slug', add);
router.get('/checkout', checkout);

module.exports = router;
