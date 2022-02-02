const express = require("express");
require("./db/mongoose.js");


const userRouter = require("./routers/user");
const taskRouter = require("./routers/task")

const app = express();
const port = process.env.PORT;
//this ensures the parsing of json into object which can be easily used in req
app.use(express.json());
app.use(userRouter)
app.use(taskRouter)

 

app.listen(port,()=>{
    console.log("we are listening on port ",port);
})

const Task = require("./models/task");
const User = require("./models/user");

// const main = async ()=>{
//     // const task = await Task.findById('61f8214e3a4c07f527cc0b68');
//     //     await task.populate('owner');
//     //     console.log(task.owner)
//     const user = await User.findById('61f820e7620701cebd3c27df');
//     await user.populate('myTasks')
//     // console.log(user.myTasks);
// }
// main()
