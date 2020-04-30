exports.paymentRequest = async (payment) => {
	return {
		success: true,
		mustRenderForm: true,
		formViewPath: 'gateways/saman',
		viewParams: {
			Amount: payment.amount * 10,
			MID: '10372149',
			ResNum: payment.hash,
			CallbackURL: `http://localhost:5500/payment/verify/${payment.hash}`,
		},
	};
};

exports.verifyRequest = async (payment, params) => {
	// const response = await zarinpal.PaymentVerification({
	// 	Amount: payment.amount,
	// 	Authority: params.query.Authority,
	// });
	// return result;
};
