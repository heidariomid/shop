
const webService = 'https://sep.shaparak.ir/payments/referencepayment1.asmx?WSDL';
const MID = '10372149';


exports.paymentReqeust = async (payment) => {

    return {
        success: true,
        mustRenderView: true,
        viewPath: 'gateways/saman',
        viewParams: {
            Amount: payment.amount * 10,
            MID,
            CallbackURL: `http://localhost:5000/payment/verify/${payment.hash}`,
            ResNum: 16545674
        }
    };

}
exports.verifyRequest = () => { };