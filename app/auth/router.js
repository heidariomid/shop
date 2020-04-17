const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/login', controller.showLogin);
router.post('/login', controller.doLogin);
router.get('/register', controller.showRegister);
router.post('/register', controller.doRegister);

module.exports = router;