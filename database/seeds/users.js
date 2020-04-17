const faker = require("faker/locale/fa");
const connection = require("../connections/mysql");
const createUsers = async (count = 10) => {
   const db = await connection();
   const users = [];

   for (let counter = 1; counter <= count; counter++) {
      users.push([faker.name.firstName(), faker.name.lastName(), faker.internet.email(), 0, faker.internet.password(), faker.phone.phoneNumber(), false]);
   }
   db.query("INSERT INTO users (`first_name`,`last_name`,`email`,`wallet`,`password`,`mobile`,`is_admin`) VALUES ?", [users]);
};

module.exports = createUsers;
