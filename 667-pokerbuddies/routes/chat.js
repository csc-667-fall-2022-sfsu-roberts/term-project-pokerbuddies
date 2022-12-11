const express = require("express");
const router = express.Router();

router.post("/:id", (req,res) =>{
    console.log("Fetch Request went through, proceeding to fetch object.");

    console.log(req.params);
    console.log(req.body);
    console.log(req.session);

    req.session.username = "Brendan"; //Account name from DB

    console.log(req.session.username);
    console.log(req.session);
    
    var today = new Date();

    const { id } = req.params;
    const { message } = req.body;
    const { username } = req.session;
    const timeStamp = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    //console.log(req.app ?? "null");

    req.app.io.emit(`chat:${id}`, {
        sender: username,
        message,
        timeStamp,
    });

    console.log("Socket emit was successful");

    res.sendStatus(200);
});

module.exports = router;