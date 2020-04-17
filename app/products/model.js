const connection = require("../../database/connections/mysql");

exports.getProducts = async () => {
   const db = await connection();
   const [records, fileds] = await db.query(`SELECT * FROM products`);
   return records;
};

exports.findBySlug = async slug => {
   const db = await connection();
   const [records, fileds] = await db.query("SELECT * FROM products WHERE slug=? LIMIT 1 ", [slug]);
   return records[0];
};
