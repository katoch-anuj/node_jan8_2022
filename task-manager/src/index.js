const express = require("express");
require("./db/mongoose.js")
const User = require("./models/user.js")
const Task = require("./models/task.js")

const app = express();
const port = process.env.PORT || 4000;
//this ensures the parsing of json into object which can be easily used in req
app.use(express.json());

/**
 *  writing
 */
app.post('/user',async (req,res)=>{
    var user = new User(req.body);
    try{
        const result=await user.save()
        res.send(result);
    }catch(e){
        res.status(400).send(e);
    }
})


/**
 *  Reading
 */
app.get("/users", async (req,res)=>{
    try{
        const user=await User.find({});
        res.send(user);
    }catch(e){
        res.status(500).send()
    }
})
app.get("/users/:id", async (req,res)=>{
    const _id=req.params.id;
    try{
        const user=await User.findById(_id);
        if(!user){
            res.status(404).send("not found")
        }
        res.send(user);
    }
    catch(e){
        res.status(500).send()
    }
    // User.findById(_id).then(user=>{
    //     //if we dont get nay result, for mongo db that's success cz mongo db was able to search what u asked and came up with no result.
    //     if(!user){
    //         res.status(404).send("not found")
    //     }
    //     res.send(user);
    // }).catch(error=>{
    //     res.status(500).send()
    // })
})
/**
 *  Updating
 */

app.patch('/users/:id',async (req,res)=>{
    const id=req.params.id;
    const updates=Object.keys(req.body);
    const allowedupdates=['name','age','email','password']
    const isValid = updates.every(update=>allowedupdates.includes(update));

    if(!isValid){
        return res.status(400).send("not valid operation") 
    }
    try{
        //new ensures that updated result is returned, runvlaidators ensure that validation occurs else in this case empty name will be saved
        const user= await User.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
        if(!user){
            res.status(400).send()
        }
        res.send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
})
app.delete('/users/:id',async(req,res)=>{
    try{
        const user= await User.findByIdAndDelete(req.params.id)
        if(!user){
            res.status(400).send("not found user")
        }
        res.send(user);
    }catch(e){
        res.status(500).send(e)
    }
})

/***
 * ------------Task section------------
 */
 app.post('/task',async (req,res)=>{
    const task=new Task(req.body);
    try{
        await task.save();
        res.send(task)
    }
    catch(e){
        res.status(400).send(e);
    }
    // task.save().then(()=>{
    //     res.send(task)
    // }).catch(error=>{
    //     res.status(400).send(error);
    // })
})

app.get("/tasks", async (req,res)=>{
    try{
        const task=await Task.find({});
        res.send(task);
    }catch(e){
        res.status(500).send()
    }
    // Task.find({}).then(task=>{
    //     res.send(task)
    // }).catch(error=>{
    //     res.status(400).send(error)
    // })
})

app.get('/tasks/:id', async (req,res)=>{
    const _id=req.params.id
    try{
        const task=await Task.findById(_id);
        if(!task){
            res.status(404).send("not found")
        }
        res.send(task);
    }
    catch(e){
        res.status(500).send()
    }
    // Task.findById(_id).then(task=>{
    //     if(!task){
    //         res.status(400).send("not found")
    //     }
    //     res.send(task)
    // }).catch(error=>{
    //     res.status(400).send(error)
    // })
})

app.patch('/tasks/:id',async (req,res)=>{
    const id=req.params.id;
    const updates=Object.keys(req.body);
    const allowedupdates=['description','completed']
    const isValid = updates.every(update=>allowedupdates.includes(update));

    if(!isValid){
        return res.status(400).send("not valid operation") 
    }
    try{
        //new ensures that updated result is returned, runvlaidators ensure that validation occurs else in this case empty name will be saved
        const user= await Task.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
        if(!user){
            res.status(400).send()
        }
        res.send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
})
app.delete('/tasks/:id',async(req,res)=>{
    try{
        const task= await Task.findByIdAndDelete(req.params.id)
        if(!task){
            res.status(400).send("not found task")
        }
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }
})

app.listen(port,()=>{
    console.log("we are listening on port ",port);
})