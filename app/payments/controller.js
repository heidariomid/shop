const {findByInput} = require('./model');
const {paymentMethods} = require('./paymentHandler');
exports.startPayment = async (req, res) => {
	const hash = req.params.order_hash;
	const order = await findByInput('hash', hash);
	let method = req.body.payment_method;
	if (method === 'online') {
		return res.render('gateways/online', {layout: 'main', order});
	}
	if ('gateway' in req.body) {
		method = 'online';
	}
	const gateway = req.body.gateway;
	const result = await paymentMethods(order, method, gateway);
	if (!result.success) {
		res.render('gateways/error');
	}
	if (result.mustRedirect) {
		res.redirect(result.redirectUrl);
	}
	if (result.mustRenderForm) {
		res.render(result.formViewPath, {layout: 'main', params: result.viewParams});
	}
};
exports.verifyPayment = async (req, res) => {
	const paymentHash = req.params.payment_hash;
	res.render('gateways/error');
};
