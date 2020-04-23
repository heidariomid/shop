const {persianConvert} = require('./persianConverter');
const toCurrency = (input) => {
	return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
const persianCurrencyToman = (input) => {
	return persianConvert(toCurrency(input)) + 'تومان';
};

module.exports = {
	toCurrency,
	persianCurrencyToman,
};
