const ZarinpalCheckout = require('zarinpal-checkout');
const zarinpal = ZarinpalCheckout.create('adf540fa-18c3-11e9-a86b-005056a205be', false);
exports.paymentRequest = async (order) => {
	const response = await zarinpal.PaymentRequest({
		Amount: order.total_price,
		CallbackURL: `https://localhost:5000/payment/verify/${order.hash}`,
		Description: 'pay with zarinpal',
		// Email: 'hi@siamak.work',
		// Mobile: '09120000000',
	});
	if (response.status === 100) {
		return {
			success: true,
			mustRedirect: true,
			redirectUrl: response.url,
		};
	} else {
		return {
			success: false,
			message: 'can not redirect,sorry',
		};
	}
};

exports.verifyRequest = async (order) => {
	const result = zarinpal.PaymentVerification({
		Amount: order.total_price,
		Authority: '000000000000000000000000000000000000',
	});
	return result;
};
