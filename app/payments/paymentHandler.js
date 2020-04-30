const cash = require('./methods/cash');
const wallet = require('./methods/wallet');
const gift = require('./methods/gift');
const online = require('./methods/online');
const methods = {
	cash,
	wallet,
	gift,
	online,
};
const methodINT = {
	1: methods.online,
};
exports.paymentMethods = async (payment, method, gateway) => {
	const paymentMethod = methods[method];
	return paymentMethod.pay(payment, gateway);
};
exports.verifyPay = async (payment, params, gateway) => {
	const {type} = payment;
	const method = methodINT[type];
	return await method.verify(payment, params, gateway);
};
