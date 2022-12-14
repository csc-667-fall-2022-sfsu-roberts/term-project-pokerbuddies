var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
let reqPath = path.join(__dirname, '../');

router.get('/', function(req, res, next) {
  const { sessionID } = req; //Reminder: if this line causes conflicts remove will be revised if needed
  const { username } = req.session; //Reminder: if this line causes conflicts remove will be revised if needed
  res.render("public/home");

});

module.exports = router;
