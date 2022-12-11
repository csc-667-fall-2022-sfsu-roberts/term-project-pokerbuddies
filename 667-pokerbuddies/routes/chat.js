const express = require("express");
const router = express.Router();

//Here we will accept any extensions with chat/id
//id can be anything even a string.
router.post("/:id", (req,res) =>{
    //On detection of the extension we will create the object, and append
    //the appropriate values to return
    console.log("Fetch Request went through, proceeding to fetch object.");

    req.session.username = "Brendan"; //Account name from DB
    var today = new Date();

    const { id } = req.params;
    const { message } = req.body;
    const { username } = req.session;
    const timeStamp = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    //Will emit this to all listeners, but only listeners with the appropriate
    //id will be able to receive the corresponding object. In this case it will
    //with the id 0. ie. chat:0
    req.app.io.emit(`chat:${id}`, {
        sender: username,
        message,
        timeStamp,
    });

    console.log("Socket emit was successful");

    res.sendStatus(200);
});

module.exports = router;