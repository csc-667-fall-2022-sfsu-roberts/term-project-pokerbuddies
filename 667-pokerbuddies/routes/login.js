var express = require('express');
var router = express.Router();
var path = require('path');
var users = require('../db/users');
const bcrypt = require("bcrypt");
const { or } = require('sequelize');


let reqPath = path.join(__dirname, '../');
router.get('/', function(req, res, next) {
  res.sendFile(reqPath+'/FrontEnd/HTML/Login.html');
});

 //route to Registration page
 router.get('/registration', function(req, res) {
    res.sendFile(path.join(reqPath, '/FrontEnd/HTML/Registration.html'));
  });
  
  router.post('/doesUserExist',async function(req, res, next) {
    var login_username = req.body.login_username; 
    var login_password = req.body.login_password;
    if(login_username == '' || login_password == ''){
    res.redirect('/login');
    }else{
    const doesUserExist = await users.doesUserExist(login_username);
    const UsrArr = Object.values(doesUserExist);

    console.log(UsrArr)
    //checks if user exists. if not, redirect to error page
    if(String(UsrArr[0])=='true'){
     const getUser = await users.getUser(login_username)
     const userInfo = Object.values(getUser)
      bcrypt.compare(login_password,userInfo[2], function(err,result){
        if(result == true){
          res.redirect('/joinSession');
        }
        else{
          res.redirect('/login');
        }
      });
    }else{
      res.redirect('/userDoesntExist');
    }}

  
  });
   //route to joinSession page
 router.get('/joinSession', function(req, res) {
  res.sendFile(path.join(reqPath, '/FrontEnd/HTML/JoinSession.html'));
});
module.exports = router;
