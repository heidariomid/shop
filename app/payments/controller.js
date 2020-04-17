const orderModel = require("../orders/model");
const { doPayment, genereateResNum, verifyPayment } = require("./payment");
const paymentModel = require("./model");
const { getTypeByName } = require("./paymentType");
exports.startPayment = async (req, res) => {
   const order_hash = req.params.order_hash;
   const paymentMethod = req.body.payment_method;
   const order = await orderModel.findByHash(order_hash);
   const payment = await paymentModel.create({
      order_id: order.id,
      type: getTypeByName(paymentMethod),
      amount: order.total_price,
      res_num: genereateResNum(),
      status: paymentModel.status.PENDING
   });

   const { success, mustRedirect, redirectUrl, mustRenderView, viewPath, viewParams } = await doPayment(payment, paymentMethod);
   if (!success) {
      // return res.render('');
   }
   if (mustRedirect) {
      return res.redirect(redirectUrl);
   }
   if (mustRenderView) {
      return res.render(viewPath, { layout: "main", params: viewParams });
   }
};

exports.verifyPayment = async (req, res) => {
   const payment_hash = req.params.payment_hash;
   const payment = await paymentModel.findPaymentByHash(payment_hash);
   const { success, ref_num } = await verifyPayment(payment, {
      query: req.query,
      body: req.body
   });
   if (!success) {
      return res.render("gateways/error", { layout: "main" });
   }

   return res.render("gateways/success", {
      layout: "main",
      params: {
         ref_num
      }
   });
};
