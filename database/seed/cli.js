require('dotenv').config();
const args = process.argv;
const seedManager = require('./index');

const commands = {
	seed: seedManager,
};

const userCommand = args.slice(2);

const mainCommand = userCommand[0];
if (!mainCommand & !Object.keys(commands).includes(mainCommand)) {
	throw new Error('wrong command!');
}

const commandToRun = commands[mainCommand];
commandToRun(userCommand.slice(1))
	.then((result) => {
		console.log('operation completed successfully!');
		process.exit(0);
	})
	.catch((error) => {
		console.log(error.message);
		process.exit(0);
	});
