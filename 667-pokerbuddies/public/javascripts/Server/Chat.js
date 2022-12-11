const socket = io();

document.querySelector("#message").addEventListener("keypress", (event) => {
    if (window.event.keyCode === 13 && event.target.value !== "") {
        console.log("User pressed enter key initiating fetch request.");
        console.log(JSON.stringify({ message: event.target.value }));

        fetch("/chat/0", {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: event.target.value })
        }).then(() => {
            console.log("Fetch request successful? Emptying text box.");
            document.querySelector("#message").value = "";
        }).catch(error => console.log(error));
    }
});

document.querySelector("#chat-button").addEventListener("click", (event) => {

    console.log("User pressed enter key initiating fetch request.");
    fetch("/chat/0", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: event.target.value })
    }).then(() => {
        console.log("Fetch request successful? Emptying text box.");
        document.querySelector("#message").value = "";
    }).catch(error => console.log(error));

});

const messages = document.querySelector("#messages");

socket.on("chat:0", ({ sender, message, timeStamp }) => {
    console.log("Listening for events with 'chat:0', if this prints it means success.")
    console.log({ sender, message, timeStamp });

    const template = document.querySelector("#message-content");

    const content = template.content.cloneNode(true);
    content.querySelector('.sender').innerText = sender + ": ";

    content.querySelector('.content').innerText = message;

    content.querySelector('.timestamp').innerText = timeStamp + " ";
    content.querySelector('.newMessage').innerHTML = "<br>";

    messages.appendChild(content);
});