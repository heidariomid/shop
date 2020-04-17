const connection = require('../../database/connections/mysql');

exports.getUsers = async () => {
    const db = await connection();
}