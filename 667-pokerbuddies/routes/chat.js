const express = require("express");
const router = express.Router();

router.post("/:id", (req,res) =>{
    console.log("Fetch Request went through, proceeding to fetch object.");
    const { id } = req.params;
    const { message } = req.body;
    const { username } = req.session;
    const timeStamp = Date.now();

    request.app.io.emit(`chat:${id}`, {
        sender: username,
        message,
        timeStamp,
    });

    console.log("Socket emit was successful");

    res.sendStatus(200);
});

module.exports = router;