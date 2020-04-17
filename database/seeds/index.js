const createUsers = require('./users');
const createProducts = require('./products');

module.exports = async (args) => {
	switch (args[0]) {
		case 'users':
			await createUsers(args[1]);
			break;
		case 'products':
			await createProducts(args[1]);
			break;
	}
};
