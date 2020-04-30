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
exports.pay = async (payment, gateway = defaultGateway) => {
	const gatewayRender = gateways[gateway];
	const gatewayResult = await gatewayRender.paymentRequest(payment);
	return generateResult(gatewayResult);
};
exports.verify = async (payment, params, gateway = defaultGateway) => {
	const gatewayRender = gateways[gateway];
	const gatewayResult = await gatewayRender.verifyRequest(payment, params);
	return gatewayResult;
};
