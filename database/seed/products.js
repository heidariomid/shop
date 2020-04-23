const faker = require('faker/locale/fa');
const connection = require('../connection/mysql');
const createProducts = async (count = 10) => {
	const db = await connection();
	const users = [];
	for (let counter = 1; counter <= count; counter++) {
		const title = faker.commerce.productName();
		users.push([title, title.toLowerCase().replace(/\s+/g, '-'), faker.random.arrayElement([50000, 100000, 2500000, 3500000, 400000, 5000, 10000, 1200000, 3800000, 8900000, 15000000, 78000000, 36000000, 14000000, 1500000]), faker.random.number(100, 1000), faker.random.arrayElement(['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg']), faker.random.number(2, 3)]);
	}

	db.query('INSERT INTO products (`title`,`slug`,`price`,`stock`,`image`,`status`) VALUES ?', [users]);
};

module.exports = createProducts;
