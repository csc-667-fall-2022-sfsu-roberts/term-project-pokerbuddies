var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
let reqPath = path.join(__dirname, '../');
router.get('/', function(req, res, next) {
  res.sendFile(reqPath+'/FrontEnd/HTML/Home.html');
});

module.exports = router;
