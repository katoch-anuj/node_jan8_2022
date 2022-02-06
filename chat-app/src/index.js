const http = require("http")
const express = require("express")
const path = require("path")
const socketio =  require("socket.io")


const publicPathName = path.join(__dirname,"../public");
const app = express();
//creating server
const server = http.createServer(app);
const io = socketio(server);
let count = 0;
io.on('connection',(socket)=>{
    console.log('client connected')
    socket.emit("countUpdated",count);
    socket.on("increment",()=>{
        io.emit("countUpdated",++count);
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