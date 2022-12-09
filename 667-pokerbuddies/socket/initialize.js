const socketIo = require("socket.io");


const initialize = (httpServer, app) =>{
    const io = new socketIo.Server(httpServer);

    io.on("connection",(socket) => {
        console.log("connection success " + socket.session_id);
    });

    app.io = io;
}

module.exports = initialize;