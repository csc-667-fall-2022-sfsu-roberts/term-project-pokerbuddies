var express = require('express');
const { appendFile } = require('fs');
var router = express.Router();
var path = require('path');
//  let game = require('../../public/javascripts/Server/Games');

let reqPath = path.join(__dirname, '../');

router.get('/', function(req, res, next) {

  let player_1_Info = {
      id: 1,
      name: 'name_1',
      total_chips: 100,
      bet: 0
  };

  let player_2_Info = {
    id: 1,
    name: 'name_2',
    total_chips: 100,
    bet: 0
  };

  let player_3_Info = {
    id: 1,
    name: 'name_3',
    total_chips: 100,
    bet: 0
  };

  let player_4_Info = {
    id: 1,
    name: 'name_4',
    total_chips: 100,
    bet: 0
  };

  res.render("protected/game",{

    pot: '0000',

    player_1_name: player_1_Info.name,
    player_1_total: player_1_Info.total_chips,
    player_1_bet: player_1_Info.bet,

    player_2_name: player_2_Info.name,
    player_2_total: player_2_Info.total_chips,
    player_2_bet: player_2_Info.bet,

    player_3_name: player_3_Info.name,
    player_3_total: player_3_Info.total_chips,
    player_3_bet: player_3_Info.bet,

    player_4_name: player_4_Info.name,
    player_4_total: player_4_Info.total_chips,
    player_4_bet: player_4_Info.bet,


  });
});

router.post('/', function(req,res){
  const {bet, call, fold, raise} = req.body;
  
  res.render('protected/game',{

  })
});

//routes to joinSession page
router.get('/joinSession', function(req, res) {
  res.sendFile(path.join(reqPath, '/FrontEnd/HTML/JoinSession.html'));
});
//routes to home page
router.get('/home', function(req, res) {
  res.sendFile(path.join(reqPath, '/FrontEnd/HTML/Home.html'));
});

module.exports = router;
/**DONE */