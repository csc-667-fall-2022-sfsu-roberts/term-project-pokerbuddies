var express = require('express');
var router = express.Router();
var path = require('path');
var users = require('../db/users');
const bcrypt = require("bcrypt");

/* GET home page. */
let reqPath = path.join(__dirname, '../');
router.get('/', function(req, response, next) {
  response.render("public/registration");
});

router.post('/insertUser',async function(req, res, next) {
  var user_name = req.body.user_name; 
  var user_password = req.body.user_password;
  if(user_name == '' || user_password == ''){
    res.redirect('/registration');
  }else{
  const doesUserExist = await users.doesUserExist(user_name);
  const userCheckArr = Object.values(doesUserExist);
  if( userCheckArr =='true'){
   res.redirect('/registration');
  }else{
const hashPassword = async() => {
  const hash = await bcrypt.hash(user_password, 10)
const createUser = await users.createUser(user_name, hash);
const userId = Object.values(createUser);
users.createPlayer(parseInt(userId[0]));
}
hashPassword()
res.redirect('/joinSession');
}
  }
});


 router.get('/joinSession', async function(req, res) {
  res.render("public/joinSession");

});

module.exports = router;
