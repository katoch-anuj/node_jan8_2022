const http = require("http")
const express = require("express")
const path = require("path")
const socketio =  require("socket.io")
const Filter = require("bad-words")
const { generateMessage, generateLocationMessage } = require ('./utils/messages')

const publicPathName = path.join(__dirname,"../public");
const app = express();
//creating server
const server = http.createServer(app);
const io = socketio(server);

io.on('connection',(socket)=>{
    socket.emit("message",generateMessage("Welcome"));
    socket.broadcast.emit("message",generateMessage("A new member has joined"))
    socket.on("sendMessage",(msg,cb)=>{
        const filter = new Filter();
        if(filter.isProfane(msg)){
            return cb("Profane message not allowed")
        }
        io.emit("message",generateMessage(msg));
        cb("delivered");
    })

    socket.on("SendLocation",({latitude,longitude},cb)=>{
        io.emit("LocationMessage",generateLocationMessage(`${latitude},${longitude}`))
        cb("Location Shared!")
    })

    socket.on('disconnect',()=>{
        io.emit("message",generateMessage("One Member has left"))
    })
})

const port = process.env.PORT || 4000;

app.use(express.static(publicPathName))

// app.get("",async(req,res)=>{
//     res.send('index')
// })

server.listen(port,()=>{
    console.log("listening on port", port)
})