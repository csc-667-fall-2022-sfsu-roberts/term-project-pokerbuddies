

const session = require("express-session");

const sessionInstance = session({
    name: "Brendan",
    secret: 'akhrglahdfklahdfglkhadflkg',
    cookie: {maxAge:24*60*60},
    resave:false,
    saveUninitialized: true,
});

module.exports = sessionInstance;
