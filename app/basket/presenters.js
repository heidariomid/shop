const { persianCurrencyToman } = require('../services/currency');

exports.basketProduct = (product) => {
    product.totalPrice = product.count * product.price;
    product.formattedPrice = persianCurrencyToman(product.price);
    product.formattedTotalPrice = persianCurrencyToman(product.totalPrice);
    return product;
}