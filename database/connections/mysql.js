const mysql = require("mysql2/promise");

const connection = async () => {
   const handler = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME
   });
   return handler;
};

module.exports = connection;
