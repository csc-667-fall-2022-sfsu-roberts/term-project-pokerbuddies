const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const router = express.Router();

app.use(express.static('public'));

var playerCount = 0;
//when a user joins a lobby onclick
//group the same people (sockets) into one room that clicked the same id
//broadcast to all players in the lobby whenever someone joins/leaves
//keep track of number of players in each lobby
//route the user to an individual games page with people in the same lobby

// router.get(`/:id`, (req,res) => {

// });
io.on('connection', function (socket) {
    console.log('A user connected to the socket.io server');

    socket.on('join', roomId => {

        // check conditions like lobby full
        if (playerCount < 4) {
            socket.join(roomId);

            io.to(roomId).emit('player join');

            console.log(`Socket ${socket.id} has joined room ${roomId}`);
            playerCount++;
            // emit to the socket to route to the new room
            //socket.emit('enterGame', roomId);
            // fetch(`/games/${roomID}`, {
            //     method: "post",
            //     headers: { "Content-Type": "application/json" },
            // }).catch(error => console.log(error));
        }
        else {
            console.log("Lobby is full");
        }

    });

    // When the socket receives a "leave" event, it leaves the specified room
    socket.on('leave', roomId => {
        socket.leave(roomId);
        console.log(`Socket ${socket.id} has left room ${roomId}`);
        playerCount--;
    }
    )
});

//server.listen(3000);

//when user clicks join, saves user to lobby database and user joins lobby
//when user clicks leave, removes user from lobby database and leaves lobby
//

module.exports = router;