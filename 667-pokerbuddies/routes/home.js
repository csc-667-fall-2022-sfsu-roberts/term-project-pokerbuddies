const express = require('express');
var router = express.Router();
const path = require('path');


let reqPath = path.join(__dirname, '../');
router.get('/', function(req, res, next) {

    res.sendFile(path.join(reqPath, '/FrontEnd/HTML/Home.html'));
    
  });
  //routes to login page
  router.get('/login', function(req, res) {
    res.sendFile(path.join(reqPath, '/FrontEnd/HTML/Login.html'));
  });
    //route to joinSession page
 router.get('/joinSession', function(req, res) {
  res.sendFile(path.join(reqPath, '/FrontEnd/HTML/JoinSession.html'));
});

router.get('/games', function(req, res) {
  res.sendFile(path.join(reqPath, '/FrontEnd/HTML/Games.html'));
});
router.get('/chat', function(req, res) {
  res.sendFile(path.join(reqPath, '/FrontEnd/HTML/Chat.html'));
});
  
  module.exports = router;

  /**DONE */