const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));

var playerCount = 0;

io.on('connection', function (socket) {
    console.log('A user connected to the socket.io server');

    socket.on('join', roomId => {
        socket.join(roomId);
        console.log(`Socket ${socket.id} has joined room ${roomId}`);
        playerCount++;
    });

    // When the socket receives a "leave" event, it leaves the specified room
    socket.on('leave', roomId => {
        socket.leave(roomId);
        console.log(`Socket ${socket.id} has left room ${roomId}`);
        playerCount--;
    }
    )
});
server.listen(3000);

//when user clicks join, saves user to lobby database and user joins lobby
//when user clicks leave, removes user from lobby database and leaves lobby
//