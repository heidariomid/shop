const { toPersianNumbers } = require('./lang');
const toCurrency = (input) => {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const persianCurrencyToman = (input) => {
    return toPersianNumbers(toCurrency(input)) +' تومان';
};

module.exports = {
    toCurrency,
    persianCurrencyToman
};