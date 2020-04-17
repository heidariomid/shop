const bodyParser = require('body-parser');
const session = require('express-session');
const sessionFileStore = require('session-file-store')(session);
module.exports = (app) => {
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        // store: new sessionFileStore({})
    }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
};