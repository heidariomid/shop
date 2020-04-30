const microtime = require('microtime');
const {findByInput, findByInputPay, create} = require('./model');
const {paymentMethods, verifyPay} = require('./paymentHandler');
const {types, status} = require('./rules/paymentMethods');
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
	const payment = await create({
		order_id: order.id,
		type: types[method.toUpperCase()],
		amount: order.total_price,
		res_num: microtime.now(),
		hash: order.hash,
		status: status.PENDING,
		gateway,
	});
	const result = await paymentMethods(payment, method, gateway);
	if (!result.success) {
		return res.render('gateways/error', {layout: 'main'});
	}
	if (result.mustRedirect) {
		return res.redirect(result.redirectUrl);
	}
	if (result.mustRenderForm) {
		return res.render(result.formViewPath, {layout: 'main', params: result.viewParams});
	}
};
exports.verifyPayment = async (req, res) => {
	const paymentHash = req.params.payment_hash;
	const payment = await findByInputPay('hash', paymentHash);
	const verifyResult = await verifyPay(
		payment,
		{
			query: req.query,
			body: req.body,
			params: req.params,
		},
		payment.gateway,
	);

	if (!verifyResult.success) {
		return res.render('gateways/error', {layout: 'main', params: verifyResult});
	}

	return res.render('gateways/success', {layout: 'main', params: verifyResult});
};
