const express = require('express');
const router = express.Router();
const {showLogin, doLogin, showRegister, doRegister} = require('./controller');

router.get('/login', showLogin);
router.post('/login', doLogin);
router.get('/register', showRegister);
router.post('/register', doRegister);

module.exports = router;
