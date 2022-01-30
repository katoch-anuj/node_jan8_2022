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

// not required as above takes care
// router.get("/users/:id", async (req,res)=>{
//     const _id=req.params.id;
//     try{
//         const user=await User.findById(_id);
//         if(!user){
//             res.status(404).send("not found")
//         }
//         res.send(user);
//     }
//     catch(e){
//         res.status(500).send()
//     }
//     // User.findById(_id).then(user=>{
//     //     //if we dont get nay result, for mongo db that's success cz mongo db was able to search what u asked and came up with no result.
//     //     if(!user){
//     //         res.status(404).send("not found")
//     //     }
//     //     res.send(user);
//     // }).catch(error=>{
//     //     res.status(500).send()
//     // })
// })
/**
 *  Updating
 */

// router.patch('/users/:id',async (req,res)=>{
//     const id=req.params.id;
//     const updates=Object.keys(req.body);
//     const allowedupdates=['name','age','email','password']
//     const isValid = updates.every(update=>allowedupdates.includes(update));

//     if(!isValid){
//         return res.status(400).send("not valid operation") 
//     }
//     try{
//         //new ensures that updated result is returned, runvlaidators ensure that validation occurs else in this case empty name will be saved
//         //this will bypass the middleware for schema so updating this.
//         // const user= await User.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
//        //below code is done so that our middleware runs and we dont update db directly
//         const user = await User.findById(id);
//         updates.forEach(update=>{
//             user[update]=req.body[update];
//         });
//         await user.save();
//         //new code neds here

//         if(!user){
//             res.status(400).send()
//         }
//         res.send(user)
//     }
//     catch(e){
//         res.status(500).send(e)
//     }
// })
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
//updating the delete route
// router.delete('/users/:id',async(req,res)=>{
//     try{
//         const user= await User.findByIdAndDelete(req.params.id)
//         if(!user){
//             res.status(400).send("not found user")
//         }
//         res.send(user);
//     }catch(e){
//         res.status(500).send(e)
//     }
// })
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
