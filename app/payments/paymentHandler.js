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
exports.paymentMethods = (order, method, res) => {
	const paymentMethod = methods[method];
	if (method === 'online') {
		return paymentMethod.gatewaysPage(order, res);
	}
	return paymentMethod.pay(order);
};
