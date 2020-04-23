const zarinpal = require('../gateways/zarinpal/zarinpalApi');
const saman = require('../gateways/saman/samanApi');
const gateways = {
	saman,
	zarinpal,
};
const defaultGateway = 'zarinpal';
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
exports.pay = async (order) => {
	const gateway = gateways[defaultGateway];
	const gatewayResult = await gateway.paymentRequest(order);
	return generateResult(gatewayResult);
};
