const {persianCurrencyToman} = require('../services/currency');
exports.totalToPersianNumber = (product) => {
	const total = product.price * product.count;
	const totalPersian = persianCurrencyToman(total);
	product.formattedTotalPrice = totalPersian;
	return product;
};
