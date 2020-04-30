const ZarinpalCheckout = require('zarinpal-checkout');
const zarinpal = ZarinpalCheckout.create('adf540fa-18c3-11e9-a86b-005056a205be', false);
exports.paymentRequest = async (payment) => {
	const response = await zarinpal.PaymentRequest({
		Amount: payment.amount,
		CallbackURL: `http://localhost:5500/payment/verify/${payment.hash}`,
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

exports.verifyRequest = async (payment, params) => {
	const response = await zarinpal.PaymentVerification({
		Amount: payment.amount,
		Authority: params.query.Authority,
	});

	if (response.status === -21) {
		return {
			success: false,
			message: 'can not verify',
			ref_num: response.RefID,
		};
	} else {
		return {
			success: true,
			ref_num: response.RefID,
		};
	}
};
