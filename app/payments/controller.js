const {findByInput} = require('./model');
const {paymentMethods} = require('./paymentHandler');
const {pay} = require('./methods/online');
exports.startPayment = async (req, res) => {
	const hash = req.params.order_hash;
	const order = await findByInput('hash', hash);
	const method = req.body.payment_method;
	if (method === 'online') {
		return paymentMethods(order, method, res);
	}
	const result = await paymentMethods(order, method, res);

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
exports.gatewayOnline = async (req, res) => {
	const hash = req.params.order;
	const order = await findByInput('hash', hash);
	const gateway = req.params.gateway;
	const result = await pay(order, gateway);

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
