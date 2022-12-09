const express = require('express');
var router = express.Router();
const path = require('path');
var users = require('../db/users');
const db = require('./index.js')



let reqPath = path.join(__dirname, '../');
router.get('/', function(req, res, next) {
  res.render("public/home"); 

  });
 
  //routes to login page
  router.get('/Accounts', function(req, res) {
    res.render("public/account");

  });
    
  
  module.exports = router;

  /**DONE */