const express = require("express");

const router = new express.Router();
const User = require("../models/user.js")

router.post('/user',async (req,res)=>{
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
router.get("/users", async (req,res)=>{
    try{
        const user=await User.find({});
        res.send(user);
    }catch(e){
        res.status(500).send()
    }
})
router.get("/users/:id", async (req,res)=>{
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

router.patch('/users/:id',async (req,res)=>{
    const id=req.params.id;
    const updates=Object.keys(req.body);
    const allowedupdates=['name','age','email','password']
    const isValid = updates.every(update=>allowedupdates.includes(update));

    if(!isValid){
        return res.status(400).send("not valid operation") 
    }
    try{
        //new ensures that updated result is returned, runvlaidators ensure that validation occurs else in this case empty name will be saved
        //this will bypass the middleware for schema so updating this.
        // const user= await User.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
       //below code is done so that our middleware runs and we dont update db directly
        const user = await User.findById(id);
        updates.forEach(update=>{
            user[update]=req.body[update];
        });
        await user.save();
        //new code neds here

        if(!user){
            res.status(400).send()
        }
        res.send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
})
router.delete('/users/:id',async(req,res)=>{
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
module.exports = router;
