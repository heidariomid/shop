require("dotenv").config();
const args = process.argv;

const seedManager = require("./database/seeds");
const migrationManager = require("./database/migrations");
const commands = {
   seed: seedManager,
   migration: migrationManager
};

const userCommand = args.slice(2);

const mainCommand = userCommand[0];
if (!mainCommand & !Object.keys(commands).includes(mainCommand)) {
   throw new Error("wrong command!");
}

const commandToRun = commands[mainCommand];

commandToRun(userCommand.slice(1))
   .then(result => {
      console.log("operation completed successfully!");
      process.exit(0);
   })
   .catch(error => {
      console.log(error.message);
      process.exit(0);
   });
