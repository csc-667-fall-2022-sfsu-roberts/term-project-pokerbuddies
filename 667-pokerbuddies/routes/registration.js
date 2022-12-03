var express = require('express');
var router = express.Router();
var path = require('path');
var users = require('../db/users');
/* GET home page. */
let reqPath = path.join(__dirname, '../');
router.get('/', function(req, response, next) {
  response.render("public/registration");
});

router.post('/insertUser',async function(req, res, next) {
  var user_name = req.body.user_name; 
  var user_password = req.body.user_password;
  const createUser = await users.createUser(user_name, user_password);
  const userId = Object.values(createUser);
  users.createPlayer(parseInt(userId[0]));
  console.log(userId);
  
//redirects to JoinSession page after inserting user into database
res.redirect('/joinSession');


});


 router.get('/joinSession', async function(req, res) {
  res.sendFile(path.join(reqPath, '/FrontEnd/HTML/JoinSession.html'));
});

module.exports = router;
