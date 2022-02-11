# WEB SOCKET
Helps to achieve full duplex communication(bidirectional comunication)i.e both client-->server and server-->client can initiate communication.
Persistent connection-->stays connected for as long as it needs to be

# socket.io
http.createServer(app);
const io= socketio(server)--> socket io expects server as a param that's why we have to create server at our end cz when express creates it we dont have access to it.

fired when socket io gets a new connection.i.e if 5 clients are connected then it will be fired 5 times
io.on('connection',(socket)={

  socket.on('disconnect',()=>{ // for disconnecting passed in the cb and name of event should be disconnect only

  })
})
Now, when we set up Socket.io to work with a given server, it also sets up a file to be served up
that your clients can access.


socket.emit("eventName",data) -->to emit to client.only emits to a single connection

io.emit("eventName",data)--> emits to all the connection

Socket.broadcast.emit() --> to all connections except one connection.
# client handler
const socket = io();
socket.on("eventName",(data)=>{

})

# extra js note
<form id="message-form">
            <input name="textValue" type="text">
            <button >Send</button>
        </form>
here input field can be accessed via (attribute name is required)
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const msg=e.target.elements.textValue.value;
})      

Passing action to form redirects the page to that url on click on submit button and all the form fields are passed in the query param.
<form action="./heelo.html">
const name="name"
const obj={name}
{name: 'name'}

offsetHeight --> excludes the margin. height in the viewport
getComputedStyle(document.querySelector("#messages").lastElementChild)--> returns all css  style prop

scrollHeigt--> total height of conatiner even which is not in viewport
scrollTop--> amount scrolled from top


# geolocation
mdn geolocation
navigator.geolocation.getCurrentPosition((position)=>{console.log(position)})
https://www.google.com/maps?q=lat,long

# Event Acknowledgements
 cb to the emit function
socket.emit("eventName",data,(msg)=>{ 

})
socket.io("eventName",(data,cb)=>{
  cb('message')
})
bad-words npm

# template rendering(mustache)
Mustcahe.render(templateselector.innerHTML)

# socket.join
This is available only at server end.This allows to join any chat room.
socket.join(room)
io.to(room).emit --> emits to all users in specific room
socket.broadcast.to(room).emit-->emits to all users except one in specific room