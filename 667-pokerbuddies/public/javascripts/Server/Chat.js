const socket = io();

document.querySelector("#message").addEventListener("keydown", (event)=>{
    if(event.keycode === 13){
        fetch("chat/0", { 
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

    const div = document.createElement("div");
    const span = document.createElement("span");
    span.innerText = sender;


    const content = document.createElement("p");
    content.innerText = message;

    div.appendChild(span);
    div.appendChild(content);

    messages.appendChild(div);
});