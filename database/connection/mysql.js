const mysql = require('mysql2/promise');
const connection = async () => {
	const handler = await mysql.createConnection({
		port: process.env.DATABASE_PORT,
		host: process.env.DATABASE_HOST,
		database: process.env.DATABASE_NAME,
		user: process.env.DATABASE_USER,
		password: process.env.DATABASE_PASSWORD,
	});
	return handler;
};
module.exports = connection;
