const homeRouter = require('./home/routes');
const authRouter = require('./auth/routes');
const usersRouter = require('./users/routes');
const productRouter = require('./products/routes');
const basketRouter = require('./basket/routes');
const paymentRouter = require('./payments/routes');
module.exports = (app) => {
	app.use('/', homeRouter);
	app.use('/auth', authRouter);
	app.use('/users', usersRouter);
	app.use('/products', productRouter);
	app.use('/basket', basketRouter);
	app.use('/payment', paymentRouter);
};
