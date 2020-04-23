const connection = require('../../database/connection/mysql');
const crypto = require('crypto');
exports.get = async () => {
	const db = await connection();
	const [records] = await db.query(`SELECT * FROM products`);
	return records;
};
exports.create = async (params) => {
	params.hash = crypto.randomBytes(20).toString('hex');
	const db = await connection();
	const [result] = await db.query(`INSERT INTO orders SET ?`, [params]);
	const [records] = await db.query(`SELECT * FROM orders WHERE id=? LIMIT 1`, [result.insertId]);
	return records[0];
};
exports.findByInput = async (name, value) => {
	const db = await connection();
	const [records, fileds] = await db.query(`SELECT * FROM products WHERE ${name}=? LIMIT 1 `, [value]);
	return records[0];
};
exports.update = async (id, params) => {
	const db = await connection();
	const [result, fileds] = await db.query(`UPDATE payments SET ? WHERE id=?`, [params, id]);
	return result.affectedRows > 0;
};
