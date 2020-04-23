const {findByInput} = require('./model');
const {paymentRequest} = require('./gateways/zarinpal/zarinpalApi');
const {paymentMethods} = require('./paymentHandler');
exports.startPayment = async (req, res) => {
	const hash = req.params.order_hash;
	const order = await findByInput('hash', hash);

	const method = req.body.payment_method;
	const result = await paymentMethods(order, method);
	console.log(result);
	if (!result.success) {
		res.render('gateways/error');
	}
	if (result.mustRedirect) {
		res.redirect(result.redirectUrl);
	}
	if (result.mustRenderForm) {
		res.render(result.formViewPath, {layout: 'main', params: veiewParams});
	}

	// res.render('gateways/saman', {layout: 'main'});
};
exports.verifyPayment = async (req, res) => {};
