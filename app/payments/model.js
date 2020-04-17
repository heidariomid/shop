const crypto = require("crypto");
const connection = require("../../database/connections/mysql");
exports.status = {
   PENDING: 0,
   FAILED: 1,
   SUCCESS: 2
};
exports.create = async params => {
   params.hash = crypto.randomBytes(20).toString("hex");
   const db = await connection();
   const [result, fileds] = await db.query(`INSERT INTO payments SET ?`, [params]);
   const [records, fii] = await db.query(`SELECT * FROM payments WHERE id=? LIMIT 1`, [result.insertId]);
   return records[0];
};

exports.update = async (id, params) => {
   const db = await connection();
   const [result, fileds] = await db.query(`UPDATE payments SET ? WHERE id=?`, [params, id]);
   return result.affectedRows > 0;
};

exports.findPaymentByHash = async hash => {
   const db = await connection();
   const [records, feilds] = await db.query(`SELECT * FROM payments WHERE hash=?`, [hash]);
   return records[0];
};
