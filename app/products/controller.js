const products = require('./model');
const { currencyPrice } = require('./presenters');
exports.index = async (req, res) => {
    const items = await products.getProducts();
    res.render('products/index', { layout: 'main', items: items.map(product => currencyPrice(product)) });
};