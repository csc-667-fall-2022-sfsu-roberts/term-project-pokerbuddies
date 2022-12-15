var express = require('express');
var router = express.Router();
var path = require('path');
const io =require('socket.io');
const { error } = require('console');

let reqPath = path.join(__dirname, '../');
router.get('/', function(req, res, next) {
  res.render("protected/JoinSession");


});
router.get('/:name', function(req, res, next) {
  const name = req.params;
  console.log(name);
  res.render("protected/JoinSession",{username: name});

});
//routes to games page
// router.get('/games/:id', function(req, res) {
//   res.render("protected/game/:id");

// });
//routes to home page
router.get('/home', function(req, res) {
  res.render("public/home");

});

//routes to account page
router.get('/account', function(req, res) {
  res.render("public/account");

});


module.exports = router;
