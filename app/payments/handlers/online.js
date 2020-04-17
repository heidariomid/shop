const zarinpal = require("./online/zarinpal");
const saman = require("./online/saman");
const paymentModel = require("../model");
const defaultGateway = "zarinpal";

const gateways = {
   zarinpal,
   saman
};

const generateResult = gatewayResult => {
   const defaultParams = {
      success: false,
      mustRedirect: false,
      redirectUrl: null,
      mustRenderView: false,
      viewPath: null,
      viewParams: null
   };
   return { ...defaultParams, ...gatewayResult };
};
exports.pay = async payment => {
   await paymentModel.update(payment.id, {
      gateway: defaultGateway
   });
   const defaultGatewayProvider = gateways[defaultGateway];
   const gatewayResult = await defaultGatewayProvider.paymentReqeust(payment);
   return generateResult(gatewayResult);
};

exports.verify = async (payment, params) => {
   const defaultGatewayProvider = gateways[defaultGateway];
   const gatewayResult = await defaultGatewayProvider.verifyRequest(payment, params);
   return gatewayResult;
};
