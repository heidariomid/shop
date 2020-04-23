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
exports.paymentMethods = (order, method) => {
	const paymentMethod = methods[method];

	return paymentMethod.pay(order);
};
