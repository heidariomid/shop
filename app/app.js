const express = require('express');
const app = express();
require('./bootstrap/')(app);
require('./middlewares/')(app);
require('./router')(app);

const connection = () => {
	app.listen(process.env.WEB_PORT, () => {
		console.log(`app is running on port ${process.env.WEB_PORT}`);
	});
};
module.exports = connection;
