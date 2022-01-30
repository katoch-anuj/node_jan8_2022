const express = require("express");

const router = new express.Router();
const User = require("../models/user.js")
const auth = require('../middleware/auth');

router.post('/user',async (req,res)=>{
    var user = new User(req.body);
    try{
        const token =  await user.generateJwtToken();
        const result=await user.save()
        res.send({result,token});
    }catch(e){
        res.status(400).send(e);
    }
})


/**
 *  Reading
 */
router.get("/users", auth, async (req,res)=>{
    try{
        const user=await User.find({});
        res.send(user);
    }catch(e){
        res.status(500).send()
    }
})
router.get("/users/me", auth, async (req,res)=>{
    
        res.send(req.user);
    
})

router.patch('/users/me', auth,async (req,res)=>{
    const updates=Object.keys(req.body);
    const allowedupdates=['name','age','email','password']
    const isValid = updates.every(update=>allowedupdates.includes(update));
    if(!isValid){
        return res.status(400).send("not valid operation") 
    }
    try{
        updates.forEach(update=>{
            req.user[update]=req.body[update];
        });
        await req.user.save();
        res.send(req.user)
    }catch(e){
        res.status(400).send()
    }
    
})
router.delete('/users/me',auth,async(req,res)=>{
    try{
        await req.user.remove()
        res.send(req.user)
    }catch(e){
        res.status(400).send()
    }
})

router.post("/user/login",async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password) // creating custom function like findById
        //function to create jwt token
        const token =  await user.generateJwtToken();
        //this syntax can be replace by using .toJSON
        // res.send({user:user.getPublicProfile,token})
        res.send({user,token})
    }catch(e){
        res.status(400).send()
    }
    
})

router.post('/user/logout', auth, async(req,res)=>{
    try{
        req.user.tokens= req.user.tokens.filter((token)=>{
            return req.token !== token.token;
        })
        await req.user.save();
        res.send('logged out')
    }catch(e){
        res.status(500).send()
    }
})
router.post('/user/logoutAll', auth, async(req,res)=>{
    try{
        req.user.tokens= [];
        await req.user.save();
        res.send('logged out all session')
    }catch(e){
        res.status(500).send("erro")
    }
})
module.exports = router;
