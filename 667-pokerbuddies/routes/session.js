var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
let reqPath = path.join(__dirname, '../');
router.get('/', function(req, res, next) {
  res.render("public/joinSession");

});

module.exports = router;