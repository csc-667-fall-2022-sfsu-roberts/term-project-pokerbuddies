const express = require("express");
const router = express.Router();

const LOBBY_ID = 0;


const getMessageName = id =>{
    if(id === LOBBY_ID){
        return "chat:lobby";
    }else{
        return 'chat:game:'
    }
}

router.get("/:id", (req,res) =>{
    const { id } = req.params;
    const { message } = req.body;
    const { username } = req.session;
    const timeStamp = Date.now();

    request.app.io.emit(`chat:${id}`, {
        sender: username,
        message,
        timeStamp,
    });

    res.sendStatus(200);
});

module.exports = router;