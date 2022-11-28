var express = require('express');
var router = express.Router();
var path = require('path');
var users = require('../db/users');
/* GET home page. */
let reqPath = path.join(__dirname, '../');
router.get('/', function(req, res, next) {
  res.sendFile(reqPath+'/FrontEnd/HTML/Registration.html');
});
router.post('/insertUser',function(req, res, next) {
  var user_name = req.body.user_name; 
  var user_password = req.body.user_password;
users.createUser(user_name, user_password);


//redirects to JoinSession page after inserting user into database
res.redirect('/joinSession');


});

 router.get('/joinSession', function(req, res) {
  res.sendFile(path.join(reqPath, '/FrontEnd/HTML/JoinSession.html'));
});

module.exports = router;
