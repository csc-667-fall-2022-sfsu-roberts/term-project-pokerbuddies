const socket = io();
const gameInfo = null;
let count = 1;
let id = document.querySelector(".gameNumber").innerText;

socket.on("startGame", function (data) {
  const size = data.player.length;
  if (size >= 1) document.querySelector(".top-cards").classList.toggle('seen');
  if (size >= 2) document.querySelector(".left-cards").classList.toggle('seen');
  if (size >= 3) document.querySelector("right-cards").classList.toggle('seen');
  if (size == 4) document.querySelector(".bottom-cards").classList.toggle('seen');

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
  const val = parseInt(document.querySelector("#betField").value); 
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

  if (data.fold) {
    document.querySelector("player-" + data.position).classList.toggle('hide');
    document.querySelector("player-" + data.position + "-info").classList.toggle('seenFold');
    document.querySelector("player-" + data.position + "-move").innerHTML = "Folded"
  } else if (data.check) {
    document.querySelector("player-" + data.position + "-move").innerHTML = "Checked"
  } else if (data.bet) {
    document.querySelector("player-" + data.position + "-move").innerHTML = "Bet";
  } else if (data.call) {
    document.querySelector("player-" + data.position + "-move").innerHTML = "Calles";
  } else if (data.raise) {
    document.querySelector("player-" + data.position + "-move").innerHTML = "Raise";
  }
});

socket.on("display", function (data) {

  if (!data.inProgress) {

    document.querySelector('.top-cards').classList.toggle('hide');
    document.querySelector('.left-cards').classList.toggle('hide');
    document.querySelector('.river-div').classList.toggle('hide');
    document.querySelector('.right-cards').classList.toggle('hide');
    document.querySelector('.bottom-cards').classList.toggle('hide');

    //add to make names visible

    return;
  }

  if (data.myBet != 0) {
    document.querySelector("player-" + data.position + "-bets").innerHTML = "bet: " + data.myBet;

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
  document.querySelector("#card-" + id).attr("src", "/images/Cards/" + card + ".png");
};

const renderPlayers = (bet, total_chips, spot, status, name) => {

  if (status == "fold") {
    document.querySelector("player-" + spot).classList.toggle('hide');
    document.querySelector("player-" + spot + "-info").classList.toggle('seenFold');
    document.querySelector("player-" + spot + "-move").innerText = "Folded";
    return;
  }
  document.querySelector("player-" + spot + "-info").classList.toggle('seen');
  document.querySelector("player-" + spot + "-name").innerText = name;
  document.querySelector("player-" + spot + "-chips").innerText = total_chips;
  document.querySelector("player-" + spot + "-bets").innerText = bet;
  document.querySelector("player-" + spot + "-move").innerText = status;
};


socket.on('Done', function (data) {
  document.querySelector('.river-div').classList.toggle('hide');
  document.querySelector('.top-cards').classList.toggle('hide');
  document.querySelector('.left-cards').classList.toggle('hide');
  document.querySelector('.river-div').classList.toggle('hide');
  document.querySelector('.right-cards').classList.toggle('hide');
  document.querySelector('.bottom-cards').classList.toggle('hide');

  document.querySelector('.pot').innerHTML = "Winner Is " + data.winner;

});

socket.on('reveal', function (data) {
  if (data.winner == data.userName) {
    alert("You Won!!");
  }
  document.querySelector('.pot').innerHTML = "Winner Is " + data.winner;
});

socket.on('join', function () {

});

socket.on(`fold:${id}`, (bet, total_chips, spot, status, name) => {
  console.log("Fold emit on front end");
  renderPlayers(bet, total_chips, spot, status, name);
})
socket.on(`bet:${id}`, (bet, total_chips, spot, status, name) => {
  console.log("Bet emited ");
  renderPlayers(bet, total_chips, spot, status, name);

})
socket.on(`raise:${id}`, (bet, total_chips, spot, status, name) => {
  console.log("raise emit");
  renderPlayers(bet, total_chips, spot, status, name);
})
socket.on(`call:${id}`, (bet, total_chips, spot, status, name) => {
  console.log("called emit");
  renderPlayers(bet, total_chips, spot, status, name);
})
socket.on(`check:${id}`, (bet, total_chips, spot, status, name) => {
  console.log("check emit");
  renderPlayers(bet, total_chips, spot, status, name);
})

document.querySelector("#fold-button").addEventListener("click", (event) => {


  fetch(`/games/fold/${id}`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: socket.id, Message: 'testing' })
  }).then(() => {
    console.log("Fetch request successful? Emptying text box.");
    document.querySelector("#fold-button").value = "";
  }).catch(error => console.log(error));

});

document.querySelector("#call-button").addEventListener("click", (event) => {


  fetch(`/games/call/${id}`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: socket.id })
  }).then(() => {
    console.log("Fetch request successful? Emptying text box.");
    document.querySelector("#call-button").value = "";
  }).catch(error => console.log(error));

});

document.querySelector("#check-button").addEventListener("click", (event) => {


  fetch(`/games/check/${id}`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: socket.id })
  }).then(() => {
    console.log("Fetch request successful? Emptying text box.");
    document.querySelector("#check-button").value = "";
  }).catch(error => console.log(error));

});

document.querySelector("#raise-button").addEventListener("click", (event) => {
  const val = document.querySelector("#betField").value;

  fetch(`/games/raise/${id}`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: socket.id, value: val })
  }).then(() => {
    console.log("Fetch request successful? Emptying text box.");
    document.querySelector("#betField").value = "";
  }).catch(error => console.log(error));

});

document.querySelector("#bet-button").addEventListener("click", (event) => {
  const val = document.querySelector("#betField").value;

  fetch(`/games/bet/${id}`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: socket.id, value: val })
  }).then(() => {
    console.log("Fetch request successful? Emptying text box.");
    document.querySelector("#betField").value = "";
  }).catch(error => console.log(error));

});


fetch(window.location.pathname, { method: "post" })
  .then((r) => r.json())
  .then(({ game_id }) => {

    socket.on(`game:${game_id}:player-joined`, ({ count, playerInfo }) => {
      debugger;
      document.querySelector("#pot").innerText = count;
      if (count == 1) {
        document.querySelector(".top-cards").classList.toggle('seen');
        document.querySelector("#player-1-name").innerText = playerInfo.getName();
        document.querySelector("#player-1-chips").innerText = playerInfo.getChips();
        document.querySelector("#player-1-moce").innerText = "Joined"
      }
      if (count == 2) {
        document.querySelector(".left-cards").classList.toggle('seen');
        document.querySelector("#player-2-name").innerText = playerInfo.name;
        document.querySelector("#player-2-chips").innerText = playerInfo.total;
        document.querySelector("#player-2-moce").innerText = "Joined"
      }
      if (count == 3) {
        document.querySelector("right-cards").classList.toggle('seen');
        document.querySelector("#player-3-name").innerText = playerInfo.name;
        document.querySelector("#player-3-chips").innerText = playerInfo.total;
        document.querySelector("#player-3-moce").innerText = "Joined"
      }
      if (count == 4) {
        document.querySelector(".bottom-cards").classList.toggle('seen');
        document.querySelector("#player-4-name").innerText = playerInfo.name;
        document.querySelector("#player-4-chips").innerText = playerInfo.total;
        document.querySelector("#player-4-moce").innerText = "Joined"
      }

      if (count === 2) {
        document.querySelector("#pot").innerHTML = '0000';
      }
    });

    socket.on(`game:${game_id}:update`, updateGame);
  })
