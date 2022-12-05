const express = require('express');
var router = express.Router();
const path = require('path');


let reqPath = path.join(__dirname, '../');
router.get('/', function(req, res, next) {
  res.render("public/home");

    
  });
  //routes to login page
  router.get('/login', function(req, res) {
    res.render("public/login");

  });
    //route to joinSession page
 router.get('/joinSession', function(req, res) {
  res.render("public/joinSession");

});

router.get('/games', function(req, res) {
  res.render("protected/game");

});
router.get('/chat', function(req, res) {
  res.render("public/chat");

});
  
  module.exports = router;

  /**DONE */