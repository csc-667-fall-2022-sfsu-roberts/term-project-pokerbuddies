const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));


io.on('connection', function(socket) {
  console.log('A user connected to the socket.io server');

  socket.on('joinLobby', function() {
    console.log('A user joined the lobby');
  });

  socket.on('leaveLobby', function() {
    console.log('A user left the lobby');
  });
});

server.listen(3000);

//when user clicks join, saves user to lobby database and user joins lobby
//when user clicks leave, removes user from lobby database and leaves lobby
//