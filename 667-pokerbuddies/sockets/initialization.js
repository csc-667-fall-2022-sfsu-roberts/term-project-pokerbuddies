const socketIO = require("socket.io");
const sessionMiddleware = require("../app-config");
const Server = socketIO.Server;

const init = (httpserver, app) => {
    const io = new Server(httpserver);

    const wrap = middleware => (socket, next) =>
        middleware(socket.request, {}, next);
    io.use(wrap(sessionMiddleware));

    io.use((socket,next)=>{
        const session = socket.request.session;

    });

    io.on("connection", (socket) =>{
        
        console.log({
            message: "Connection happened",
            session: socket.request.session,
        })
    })
    app.io = io;
}

module.exports = init;