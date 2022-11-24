var express = require('express');
var router = express.Router();
var path = require('path');


let reqPath = path.join(__dirname, '../');
router.get('/', function(req, res, next) {
  res.sendFile(reqPath+'/FrontEnd/HTML/Login.html');
});
 //route to Registration page
 router.get('/registration', function(req, res) {
    res.sendFile(path.join(reqPath, '/FrontEnd/HTML/Registration.html'));
  });
   //route to joinSession page
 router.get('/joinSession', function(req, res) {
  res.sendFile(path.join(reqPath, '/FrontEnd/HTML/JoinSession.html'));
});
module.exports = router;
