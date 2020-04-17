const microtime = require("microtime");
const cash = require("./handlers/cash");
const gift = require("./handlers/gift");
const online = require("./handlers/online");
const wallet = require("./handlers/wallet");
const types = require("./paymentType").types;

const methods = {
   cash,
   gift,
   online,
   wallet
};

const getMethodByType = type => {
   return {
      [types.ONLINE]: online,
      [types.CASH]: cash,
      [types.GIFT]: gift,
      [types.WALLET]: wallet
   }[type];
};
exports.doPayment = async (payment, method) => {
   const paymentMethod = methods[method];
   const result = await paymentMethod.pay(payment);
   return result;
};

exports.genereateResNum = () => {
   return microtime.now();
};

exports.verifyPayment = async (payment, params) => {
   const { type } = payment;
   const provider = getMethodByType(type);
   return await provider.verify(payment, params);
};
