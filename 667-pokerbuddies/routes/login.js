var express = require('express');
var router = express.Router();
var path = require('path');
var users = require('../db/users');



let reqPath = path.join(__dirname, '../');


router.get("/", (_request, response) => {
  response.render("public/login");
  // response.sendFile(path.join(reqPath, '/FrontEnd/HTML/Login.html'));
});

// router.post('/login',(responce,redirect) => (err)=>{

// })

 //route to Registration page
 router.get('/registration', function(req, res) {
      response.render("public/registration");
  });
  router.post('/doesUserExist',async function(req, res, next) {
    var login_username = req.body.login_username; 
    
    const doesUserExist = await users.doesUserExist(login_username);
    const UsrArr = Object.values(doesUserExist);
    //checks if user exists. if not, redirect to error page
    if(String(UsrArr[0])=='true'){
      res.redirect('/joinSession');
    }else{
      res.redirect('/userDoesntExist');
    }
  
  });
   //route to joinSession page
 router.get('/joinSession', function(req, res) {
  res.sendFile(path.join(reqPath, '/FrontEnd/HTML/JoinSession.html'));
});
module.exports = router;
