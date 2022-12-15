var express = require("express");
var router = express.Router();
<<<<<<< HEAD
var path = require("path");
var users = require("../db/users");
=======
var path = require('path');
var users = require('../db/users');
var games = require('../db/games');
>>>>>>> 5230632df55ec3f9a3768520535ae147da102b70
const bcrypt = require("bcrypt");
const { or } = require("sequelize");
const io = require("socket.io");

let reqPath = path.join(__dirname, "../");

router.get("/", (_request, response) => {
  response.render("public/login");
  // response.sendFile(path.join(reqPath, '/FrontEnd/HTML/Login.html'));
});


<<<<<<< HEAD
//route to Registration page
router.get("/registration", function (req, res) {
  response.render("public/registration");
});

router.post("/doesUserExist", async function (req, res, next) {
  var login_username = req.body.login_username;
  var login_password = req.body.login_password;
  if (login_username == "" || login_password == "") {
    res.redirect("/login");
  } else {
=======
 //route to Registration page
 router.post('/registration', function(req, res) {
      response.render("public/registration");
  });
  
  router.post('/doesUserExist',async function(req, res, next) {
    debugger;
    var login_username = req.body.login_username; 
    var login_password = req.body.login_password;
    if(login_username == '' || login_password == ''){
    res.redirect('/login');
    }else{
>>>>>>> 5230632df55ec3f9a3768520535ae147da102b70
    const doesUserExist = await users.doesUserExist(login_username);
    const UsrArr = Object.values(doesUserExist);

    console.log(UsrArr);
    //checks if user exists. if not, redirect to error page
<<<<<<< HEAD
    if (String(UsrArr[0]) == "true") {
      const getUser = await users.getUser(login_username);
      const userInfo = Object.values(getUser);
      bcrypt.compare(login_password, userInfo[2], function (err, result) {
        if (result == true) {
=======
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
      }
      );
    }else{
      res.redirect('/userDoesntExist');
    }}
>>>>>>> 5230632df55ec3f9a3768520535ae147da102b70

          // req.app.io.emit("player-added-login", login_username);
          res.redirect(`/joinSession/${login_username}`);
        } else {
          res.redirect("/login");
        }
      });
    } else {
      res.redirect("/userDoesntExist");
    } //
  }
});
//route to joinSession page
router.get("/joinSession", function (req, res) {
  res.redirect("/joinSession");
});
module.exports = router;
