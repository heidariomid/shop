const connection = require("../../database/connections/mysql");
const crypto = require("crypto");
exports.getOrders = async () => {
   const db = await connection();
   const [records] = await db.query(`SELECT * FROM orders`);
   return records;
};

exports.create = async params => {
   params.hash = crypto.randomBytes(20).toString("hex");
   const db = await connection();
   const [result] = await db.query(`INSERT INTO orders SET ?`, [params]);
   const [records] = await db.query(`SELECT * FROM orders WHERE id=? LIMIT 1`, [result.insertId]);
   return records[0];
};

exports.findByHash = async hash => {
   const db = await connection();
   const [records] = await db.query(`SELECT * FROM orders WHERE hash=?`, [hash]);
   return records[0];
};
