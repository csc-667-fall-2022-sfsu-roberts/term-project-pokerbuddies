const express = require('express');
var router = express.Router();
const path = require('path');


let reqPath = path.join(__dirname, '../');
router.get('/', function(req, res, next) {

    res.sendFile(path.join(reqPath, '/FrontEnd/HTML/UserDoesntExist.html'));
    
  });
  //routes to registration page
  router.get('/registration', function(req, res) {
    res.sendFile(path.join(reqPath, '/FrontEnd/HTML/Registration.html'));
  });
   //routes to joinSession page
   router.get('/joinSession', function(req, res) {
    res.sendFile(path.join(reqPath, '/FrontEnd/HTML/JoinSession.html'));
  });
  
  module.exports = router;