const homeRouter = require('./home/router');
const authRouter = require('./auth/router');
const usersRouter = require('./users/routes');
const productRouter = require('./products/router');
const basketRouter = require('./basket/routes');
const paymentRouter = require('./payments/router');
module.exports = (app) => {
    app.use('/', homeRouter);
    app.use('/auth', authRouter);
    app.use('/users', usersRouter);
    app.use('/products', productRouter);
    app.use('/basket', basketRouter);
    app.use('/payment', paymentRouter);
};