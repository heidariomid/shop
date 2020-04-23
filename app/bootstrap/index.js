const path = require('path');
const express = require('express');
const hbs = require('express-handlebars');

module.exports = (app) => {
	const ROOT_PATH = path.dirname(require.main.filename);
	const APP_PATH = path.join(ROOT_PATH, 'app');

	app.engine(
		'hbs',
		hbs({
			extname: 'hbs',
			layoutsDir: path.join(APP_PATH, '/views/layouts/'),
		}),
	);
	app.set('view engine', 'hbs');
	app.set('views', path.join(APP_PATH, 'views'));
	app.use(express.static(path.join(ROOT_PATH, 'public')));
};
