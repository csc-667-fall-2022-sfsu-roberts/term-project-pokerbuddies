var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
let reqPath = path.join(__dirname, '../');
router.get('/', function(req, res, next) {
  res.sendFile(reqPath+'/FrontEnd/HTML/Login.html');
});
 //routes to Registration page
 router.get('/registration', function(req, res) {
    res.sendFile(path.join(reqPath, '/FrontEnd/HTML/Registration.html'));
  });
module.exports = router;
