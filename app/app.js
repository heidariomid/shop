const express = require('express');
const app = express();

require('./bootstrap/')(app);
require('./middlewares/')(app);
require('./router')(app);

module.exports = () => {
	app.listen(process.env.APP_PORT, () => {
		console.log(`shop is working on port ${process.env.WEB_PORT}`);
	});
};
