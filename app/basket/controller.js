const productModel = require("../products/model");
const orderModel = require("../orders/model");

const { basketProduct } = require("./presenters");
exports.index = async (req, res) => {
   let items = [];

   if (req.session.basket) {
      items = Object.keys(req.session.basket).map(id => {
         return basketProduct(req.session.basket[id]);
      });
   }
   res.render("basket/index", {
      layout: "main",
      items
   });
};

exports.add = async (req, res) => {
   const slug = req.params.slug;
   const product = await productModel.findBySlug(slug);

   if (!product) {
      return res.status(404).render("errors/404", { layout: "main" });
   }

   if (!("basket" in req.session)) {
      req.session.basket = {};
   }

   if (product.id in req.session.basket) {
      let { count, price } = req.session.basket[product.id];
      req.session.basket[product.id].count = ++count;
   } else {
      req.session.basket[product.id] = {
         id: product.id,
         title: product.title,
         price: product.price,
         count: 1,
         image: product.image
      };
   }

   res.redirect("/basket");
};

exports.checkout = async (req, res) => {
   const items = req.session.basket;
   let totalPrice = 0;
   Object.keys(items).forEach(id => {
      const product = items[id];
      totalPrice += product.count * product.price;
   });
   const order = await orderModel.create({
      user_id: 1,
      total_price: totalPrice,
      items_count: Object.keys(items).length,
      shipping_address: "",
      status: 0
   });
   res.render("orders/details", { layout: "main", order });
};
