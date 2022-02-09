const http = require("http")
const express = require("express")
const path = require("path")
const socketio =  require("socket.io")
const Filter = require("bad-words")
const { generateMessage, generateLocationMessage } = require ('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require ('./utils/users')

const publicPathName = path.join(__dirname,"../public");
const app = express();
//creating server
const server = http.createServer(app);
const io = socketio(server);

io.on('connection',(socket)=>{
    socket.on('joinRoom',(options,cb)=>{
       const {error,user} =  addUser({id:socket.id,...options});
       if(error){
        return cb(error);
       }
        socket.join(user.room);
        socket.emit("message",generateMessage("Welcome","Admin"));
        socket.broadcast.to(user.room).emit("message",generateMessage(`${user.username} has just joined!`,"Admin"))
        const usersInroom = getUsersInRoom(user.room);
        io.to(user.room).emit("userList",{room:user.room,usersInroom});
        cb();
    })
    socket.on("sendMessage",(msg,cb)=>{
        const user = getUser(socket.id);
        const filter = new Filter();
        if(filter.isProfane(msg)){
            return cb("Profane message not allowed")
        }
        io.to(user.room).emit("message",generateMessage(msg,user.username));
        cb("delivered");
    })

    socket.on("SendLocation",({latitude,longitude},cb)=>{
        const user = getUser(socket.id);
        io.to(user.room).emit("LocationMessage",generateLocationMessage(`${latitude},${longitude}`,user.username))
        cb("Location Shared!")
    })

    socket.on('disconnect',()=>{
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit("message",generateMessage(`${user.username} has left`))
            const usersInroom =getUsersInRoom(user.room);
            io.to(user.room).emit("userList",{room:user.room,usersInroom});
        }
        
    })
})

const port = process.env.PORT || 4000;

app.use(express.static(publicPathName))

server.listen(port,()=>{
    console.log("listening on port", port)
})