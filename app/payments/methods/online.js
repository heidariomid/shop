const zarinpal = require('../gateways/zarinpal/zarinpalApi');
const saman = require('../gateways/saman/samanApi');
const gateways = {
	saman,
	zarinpal,
};
const defaultGateway = 'saman';
const generateResult = (gatewayResult) => {
	const defaultPramas = {
		success: false,
		mustRedirect: false,
		redirectUrl: null,
		mustRenderForm: false,
		formViewPath: null,
		viewParams: null,
	};
	return {...defaultPramas, ...gatewayResult};
};
exports.pay = async (order, gatewayChosen = defaultGateway) => {
	const gateway = gateways[gatewayChosen];
	const gatewayResult = await gateway.paymentRequest(order);
	return generateResult(gatewayResult);
};
exports.gatewaysPage = async (order, res) => {
	return res.render('gateways/online', {layout: 'main', order});
};
