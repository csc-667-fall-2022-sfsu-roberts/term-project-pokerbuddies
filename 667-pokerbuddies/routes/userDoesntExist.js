const express = require('express');
var router = express.Router();
const path = require('path');


let reqPath = path.join(__dirname, '../');
router.get('/', function(req, res, next) {
  res.render("public/userDoesntExist");

    
  });
  //routes to registration page
  router.get('/registration', function(req, res) {
    res.render("public/registration");

  });
   //routes to joinSession page
   router.get('/joinSession', function(req, res) {
    res.render("public/joinSession");

  });
  
  module.exports = router;