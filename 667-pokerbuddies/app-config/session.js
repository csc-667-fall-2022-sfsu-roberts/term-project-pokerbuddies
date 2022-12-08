const session = require("express-session");

const sessionInstance = session({
    secret: "asdgsagdgasgsadgsdg",
    cookie: {maxAge: 24 * 60 * 60},
    resave: false,
    saveUninitialized: true,
});

module.exports = sessionInstance