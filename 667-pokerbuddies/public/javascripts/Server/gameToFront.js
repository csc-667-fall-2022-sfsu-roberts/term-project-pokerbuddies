// import Game from '/javascripts/Server/Games.js';

$(document).ready(function () {
  $('.player-1').css({ visibility: 'hidden' });
  $('.player-2').css({ visibility: 'hidden' });
  $('.river-div').css({ visibility: 'hidden' });
  $('.player-3').css({ visibility: 'hidden' });
  $('.player-4').css({ visibility: 'hidden' });
  // $('#player-1-info').css({ visibility: 'visible' });
  // $('.modal-trigger').leanModal();
  // $('.tooltipped').tooltip({ delay: 50 });
});

const socket = io();
// const game = new Game();
const gameInfo = null;

socket.on("startGame", function (data) {
  const size = data.player.length;
  if (size >= 1) $(".top-cards").css({ visibility: "visible" });
  if (size >= 2) $(".left-cards").css({ visibility: "visible" });
  if (size >= 3) $("right-cards").css({ visibility: "visible" });
  if (size == 4) $(".bottom-cards").css({ visibility: "visible" });

  if (data == undefined) {
    alert("Error - invalid game.");
  }
});

const fold = () => {
  socket.emit("madeMove", {
    move: "fold",
    bet: "fold",
  });
};

const bet = () => {
  const val = parseInt($("#betField").val());
  if (val == 0) {
    alert("You must bet more then 0");
  } else {
    socket.emit("moveMade", {
      move: "bet",
      bet: val,
    });
  }
};

const call = () => {
  socket.emit("moveMade", {
    move: "call",
    bet: "call",
  });
};

const check = () => {
  socket.emit("moveMade", {
    move: "check",
    bet: "check",
  });
};

const raise = () => {
  const val = parseInt($("#betField").val());
  socket.emit("moveMade", {
    move: "raise",
    bet: val,
  });
};

socket.on("displayPossibleMoves", function (data) {
  //hides cards and dulls the player info
  if (data.fold) {
    $("player-" + data.position).css({ visibility: "hidden" });
    $("player-" + data.position + "-info").css({
      visibility: "visible",
      opacity: 0.5,
    });
    $("player-" + data.position + "-move").text("Folded");
    //    $('.button-layout').css({ visibility: 'hidden' });
  } else if (data.check) {
    $("player-" + data.position + "-move").text("checked");
  } else if (data.bet) {
    $("player-" + data.position + "-move").text("bet");
    // $('player-' + data.position +'-bets' ).text('checked');
  } else if (data.call) {
    $("player-" + data.position + "-move").text("called");
  } else if (data.raise) {
    $("player-" + data.position + "-move").text("raise");
  }
});

socket.on("display", function (data) {

    if(!data.inProgress){
        $('.top-cards').css({ visibility: 'hidden' });
        $('.left-cards').css({ visibility: 'hidden' });
        $('.river-div').css({ visibility: 'hidden' });
        $('.right-cards').css({ visibility: 'hidden' });
        $('.bottom-cards').css({ visibility: 'hidden' });

        //add to make names visible

        return;
    }

  if (data.myBet != 0) {
    $("player-" + data.position + "-bets").text("bet: " + data.myBet);
  }

  //stores river cards so theyre the same
  if (data.river != undefined) {
    let count = 9;
    for (const card of data.river) {
      renderCard(card, count);
      count++;
    }
  }

  //stores player attributes
  for (const p of data.players) {
    renderPlayers({
      name: p.userName,
      status: p.status,
      chips: p.chips,
      bet: p.bet,
      isChecked: p.isChecked,
      position: p.position,
    });
  }
});



const renderCard = (card, num) => {
  $("#card-" + id).attr("src", "/images/Cards/" + card + ".png");
};

const renderPlayers = (player) => {
  if (player.status == "fold") {
    $("player-" + player.position).css({ visibility: "hidden" });
    $("player-" + player.position + "-info").css({
      visibility: "visible",
      opacity: 0.5,
    });
    $("player-" + player.position + "-move").text("Folded");
    return;
  }
  $("player-" + player.position + "-name").text(p.name);
  $("player-" + player.position + "-chips").text(p.chips);
  $("player-" + player.position + "-bets").text(p.bet);
  $("player-" + player.position + "-move").text(p.status);
};


socket.on('Done', function(data){
    $('.river-div').css({ visibility: "hidden" });
    $('.top-cards').css({ visibility: 'hidden' });
    $('.left-cards').css({ visibility: 'hidden' });
    $('.river-div').css({ visibility: 'hidden' });
    $('.right-cards').css({ visibility: 'hidden' });
    $('.bottom-cards').css({ visibility: 'hidden' });

    $('.pot').text("Winner Is "+ data.winner);
});

socket.on('reveal', function(data){
    if(data.winner == data.userName){
        alert("You Won!!");
    }

    $('.pot').text("Winner " + data.winner);
    //flipp cards of those still in
});

