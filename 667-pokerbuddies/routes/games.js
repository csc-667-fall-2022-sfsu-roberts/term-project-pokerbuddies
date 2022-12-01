var express = require('express');
var router = express.Router();
var path = require('path');


let reqPath = path.join(__dirname, '../');
router.get('/', function(req, res, next) {


  //create a game 
  res.sendFile(reqPath+'/FrontEnd/HTML/Games.html');
});
//routes to joinSession page
router.get('/joinSession', function(req, res) {
  res.sendFile(path.join(reqPath, '/FrontEnd/HTML/JoinSession.html'));
});
//routes to home page
router.get('/home', function(req, res) {
  res.sendFile(path.join(reqPath, '/FrontEnd/HTML/Home.html'));
});

module.exports = router;
/**DONE */