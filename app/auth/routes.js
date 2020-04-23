const express = require('express');
const router = express.Router();
const {showLogin, showRegister, doLogin, doRegister} = require('./controller');

router.get('/login', showLogin);
router.get('/register', showRegister);
router.post('/login', doLogin);
router.post('/register', doRegister);

module.exports = router;
