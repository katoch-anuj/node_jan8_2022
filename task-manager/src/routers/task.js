const express = require ("express");
const router = new express.Router;
const Task = require("../models/task.js");

router.post('/task',async (req,res)=>{
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

router.get("/tasks", async (req,res)=>{
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

router.get('/tasks/:id', async (req,res)=>{
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

router.patch('/tasks/:id',async (req,res)=>{
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
router.delete('/tasks/:id',async(req,res)=>{
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

module.exports = router;