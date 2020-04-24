exports.paymentRequest = async (order) => {
	return {
		success: true,
		mustRenderForm: true,
		formViewPath: 'gateways/saman',
		viewParams: {
			Amount: order.total_price * 10,
			MID: '10372149',
			ResNum: order.hash,
			CallbackURL: `http://localhost:5500/payment/verify/${order.hash}`,
		},
	};
};

exports.verifyRequest = async (order) => {
	const result = zarinpal.PaymentVerification({
		Amount: order.total_price,
		Authority: '000000000000000000000000000000000000',
	});
	return result;
};
