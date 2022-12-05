const express = require('express');
var router = express.Router();
const path = require('path');


let reqPath = path.join(__dirname, '../');
router.get('/', function(req, res, next) {
  res.render("public/home");

    
  });
  //routes to Account page
  router.get('/Account', function(req, res) {
    res.render("public/account");
  });
   //routes to joinSession page
   router.get('/joinSession', function(req, res) {
    res.render("public/joinSession");

  });
  //routes to home page
router.get('/home', function(req, res) {
  res.render("public/home");

});
  module.exports = router;