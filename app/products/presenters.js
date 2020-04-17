const { persianCurrencyToman } = require('../services/currency');
const { toPersianNumbers } = require('../services/lang');
exports.currencyPrice = (product) => {
    product.formattedPrice = persianCurrencyToman(product.price);
    return product;
}