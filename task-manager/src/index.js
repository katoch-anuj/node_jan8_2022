const express = require("express");
require("./db/mongoose.js")

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task")

const app = express();
const port = process.env.PORT || 4000;
//this ensures the parsing of json into object which can be easily used in req
app.use(express.json());
app.use(userRouter)
app.use(taskRouter)

 

app.listen(port,()=>{
    console.log("we are listening on port ",port);
})