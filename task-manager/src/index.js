const express = require("express");
require("./db/mongoose.js")
const User = require("./models/user.js")
const Task = require("./models/task.js")

const app = express();
const port = process.env.PORT || 4000;
//this ensures the parsing of json into object which can be easily used in req
app.use(express.json());

app.post('/user',(req,res)=>{
    var user = new User(req.body);
    user.save().then((result)=>{
        res.send(result)
    }).catch((error)=>{
        res.status(400).send(error);
    })
})
app.post('/task',(req,res)=>{
    const task=new Task(req.body);
    task.save().then(()=>{
        res.send(task)
    }).catch(error=>{
        res.status(400).send(error);
    })
})

app.get("/users",(req,res)=>{
    User.find({}).then(result=>{
        res.send(result);
    }).catch(error=>{
        res.status(500).send()
    })
})
app.get("/users/:id",(req,res)=>{
    const _id=req.params.id;
    User.findById(_id).then(user=>{
        //if we dont get nay result, for mongo db that's success cz mongo db was able to search what u asked and came up with no result.
        if(!user){
            res.status(404).send("not found")
        }
        res.send(user);
    }).catch(error=>{
        res.status(500).send()
    })
})

app.get("/tasks",(req,res)=>{
    Task.find({}).then(task=>{
        res.send(task)
    }).catch(error=>{
        res.status(400).send(error)
    })
})

app.get('/tasks/:id',(req,res)=>{
    const _id=req.params.id
    Task.findById(_id).then(task=>{
        if(!task){
            res.status(400).send("not found")
        }
        res.send(task)
    }).catch(error=>{
        res.status(400).send(error)
    })
})

app.listen(port,()=>{
    console.log("we are listening on port ",port);
})