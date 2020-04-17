const products = require('../products/model');
exports.index = async (req, res) => {
    const items = await products.getProducts();
    res.render('products/index', { layout: 'main', items });
};