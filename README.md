# WEB SOCKET
Helps to achieve full duplex communication(bidirectional comunication)i.e both client-->server and server-->client can initiate communication.
Persistent connection-->stays connected for as long as it needs to be

# socket.io
http.createServer(app);
const io= socketio(server)--> socket io expects server as a param that's why we have to create server at our end cz when express creates it we dont have access to it.

fired when socket io gets a new connection.i.e if 5 clients are connected then it will be fired 5 times
io.on('connection',(socket)={

})
Now, when we set up Socket.io to work with a given server, it also sets up a file to be served up
that your clients can access.

socket.emit("eventName",data) -->to emit to client
above only emits to a single connection
io.emit("eventName",data)--> emits to all the connection


# client handler
const socket = io();
socket.on("eventName",(data)=>{

})