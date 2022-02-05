const express = require("express");
require("./db/mongoose.js");


const userRouter = require("./routers/user");
const taskRouter = require("./routers/task")

const app = express();

//this ensures the parsing of json into object which can be easily used in req
app.use(express.json());
app.use(userRouter)
app.use(taskRouter)

 
module.exports =app;
