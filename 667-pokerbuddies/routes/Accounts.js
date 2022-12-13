const express = require('express');
var router = express.Router();
const path = require('path');
var users = require('../db/users');

let reqPath = path.join(__dirname, '../');
router.get('/', async function(req, res, next) {
  const userRow = await users.getUserID(1);
  const userArr = Object.values(userRow);
  const playerRow = await users.getPlayer(1); //hard coded
 const playerArr = Object.values(playerRow);
 
  res.render('public/account',{totalChips: playerArr[1], chipsWon: playerArr[2], userName: userArr[1]})
  //res.render("public/account");

    
  });
 router.post('/updateChips',async function(req, res, next) {
  var chipInput = req.body.updateChips;

 const playerRow = await users.getPlayer(1);
 const playerArr = Object.values(playerRow);
var totalChips = parseInt(chipInput) + parseInt(playerArr[1]);
await users.insertPlayerChips(1,totalChips).catch(err => {
  res.render('public/account',{totalChips: totalChips})

  console.log(err.stack);
});


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