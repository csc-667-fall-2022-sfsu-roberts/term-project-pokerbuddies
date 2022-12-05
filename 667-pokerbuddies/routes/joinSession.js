var express = require('express');
var router = express.Router();
var path = require('path');


let reqPath = path.join(__dirname, '../');
router.get('/', function(req, res, next) {
  res.sendFile(reqPath+'/FrontEnd/HTML/JoinSession.html');
});
//routes to games page
router.get('/games', function(req, res) {
  res.sendFile(path.join(reqPath, '/FrontEnd/HTML/Games.html'));
});
//routes to home page
router.get('/home', function(req, res) {
  res.sendFile(path.join(reqPath, '/FrontEnd/HTML/Home.html'));
});
//routes to account page
router.get('/account', function(req, res) {
  res.sendFile(path.join(reqPath, '/FrontEnd/HTML/Account.html'));
});
module.exports = router;
