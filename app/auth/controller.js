const products = require('../products/model');
exports.showLogin = async (req, res) => {
    res.render('auth/login', { layout: 'main' });
};
exports.doLogin = async (req, res) => { };
exports.showRegister = async (req, res) => {
    res.render('auth/register', { layout: 'main' });

};
exports.doRegister = async (req, res) => { };