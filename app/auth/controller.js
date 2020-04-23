exports.showLogin = async (req, res) => {
	res.render('auth/login', {layout: 'main'});
};
exports.showRegister = async (req, res) => {
	res.render('auth/register', {layout: 'main'});
};
exports.doLogin = async (req, res) => {
	res.render('auth/login', {layout: 'main'});
};
exports.doRegister = async (req, res) => {
	res.render('auth/register', {layout: 'main'});
};
