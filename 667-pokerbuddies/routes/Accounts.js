const express = require('express');
var router = express.Router();
const path = require('path');


let reqPath = path.join(__dirname, '../');
router.get('/', function(req, res, next) {

    res.sendFile(path.join(reqPath, '/FrontEnd/HTML/Home.html'));
    
  });
  //routes to Account page
  router.get('/Account', function(req, res) {
    res.sendFile(path.join(reqPath, '/FrontEnd/HTML/Account.html'));
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