const socket = io();
socket.on("countUpdated",(count)=>{
    console.log("client listener",count);
})
const btn=document.querySelector("#incrementBtn");
btn.addEventListener("click",()=>{
    console.log("clicked")
    socket.emit('increment')
})