const socket = io();

document.querySelector("#message").addEventListener("keypress", (event)=>{
    if(window.event.keyCode === 13){
        console.log("Youre too slow");
        fetch("/chat/0", { 
            method: "post",
            header: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: event.target.value }) 
        }).then(() => {
            document.querySelector("#message").value = "";
        }).catch(error => console.log(error));
    }
});

const messages = document.querySelector("#messages");

socket.on("chat:0", ({ sender, message, timeStamp }) => {
    console.log({ sender, message, timeStamp });

    const template = document.querySelector("message-content");

    const content = template.content.cloneNode(true);
    content.querySelector('.sender').innerText = sender;
    content.querySelector('.content').innerText = message;
    content.querySelector('.timestamp').innerText = timestamp;

    messages.appendChild(content);
});