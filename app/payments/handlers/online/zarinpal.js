const zarinPalClient = require('zarinpal-checkout');
const zarinaPalKey = 'adf540fa-18c3-11e9-a86b-005056a205be';
const zarinpal = zarinPalClient.create(zarinaPalKey, false);


exports.paymentReqeust = async (payment) => {

    const response = await zarinpal.PaymentRequest({
        Amount: payment.amount,
        CallbackURL: `http://localhost:5000/payment/verify/${payment.hash}`,
        Description: 'پرداخت سفارش با زرین پال',
        // Email: 'hi@siamak.work',
        // Mobile: '09120000000'
    });
    if (response.status === 100) {
        return {
            success: true,
            mustRedirect: true,
            redirectUrl: response.url
        };
    }
    return {
        success: false
    };

}
exports.verifyRequest = async (payment, params) => {

    const response = await zarinpal.PaymentVerification({
        Amount: payment.amount,
        Authority: params.query.Authority
    });

    if (response.status === -21) {
        return {
            success: false,
        };
    }

    return {
        success: true,
        ref_num: response.RefID
    }

};