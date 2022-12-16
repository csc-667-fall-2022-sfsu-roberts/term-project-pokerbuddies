const socket = io();

//We will select an element with the id message. This will be our text box where
//we enter a message. We add an event listener for keypresses, and pass that as
//a parameter to the function. If the event keycode is equal to 13, enter, and the
//text box is not empty then we will make a fetch request to our backend.
//
//This script will be imported to game.pug for use.
let LOBBY_ID = 1;

document.querySelector("#message").addEventListener("keypress", (event) => {
    if (window.event.keyCode === 13 && event.target.value !== "") {
        //We will send a fetch request on success. It will go the backend
        //chat.js where it will run a post based on the extension of the url
        //sent by the fetch request. In this case the extension is /0. On
        //success we will empty the text box. We can make the extension
        //dynamic for when we do session of games.
        fetch(`/chat/${LOBBY_ID}`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: event.target.value })
        }).then(() => {
            console.log("Fetch request successful? Emptying text box.");
            document.querySelector("#message").value = "";
        }).catch(error => console.log(error));
    }
});

//This is the code to make it so that the send button works as well.
document.querySelector("#chat-button").addEventListener("click", (event) => {
    if (event.target.value !== "") {
        console.log("User pressed enter key initiating fetch request.");
        fetch(`/chat/${LOBBY_ID}`, {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: document.querySelector("#message").value })
        }).then(() => {
            console.log("Fetch request successful? Emptying text box.");
            document.querySelector("#message").value = "";
        }).catch(error => console.log(error));
    }


});

const messages = document.querySelector("#messages");

//Our socket listener that will listen for any chat:0 emmissions
//This will append html/css according to id/class name

socket.on(`chat:${LOBBY_ID}`, ({ sender, message, timeStamp }) => {
    console.log("Listening for events with 'chat:1', if this prints it means success.")
    console.log({ sender, message, timeStamp });

    const template = document.querySelector("#message-content");

    const content = template.content.cloneNode(true);
    content.querySelector('.sender').innerText = sender + ": ";

    content.querySelector('.content').innerText = message;

    content.querySelector('.timestamp').innerText = timeStamp + " ";
    content.querySelector('.newMessage').innerHTML = "<br>";

    messages.appendChild(content);
});