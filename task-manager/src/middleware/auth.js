const jwt = require('jsonwebtoken');
const User = require ('../models/user')

const auth = async (req, res, next)=>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')//this will return along with Bearer
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        //_id: to check if user exists
        //tokens.token as second param to check if the token is present in the list of tokens. we will remove the token once user logs out
        const user = await User.findOne({_id:decoded._id,'tokens.token':token});
        if(!user){
            throw new Error()
        }
        req.token=token;
        //since we have the user info here we can attache same to req
        req.user =user;
        next()
    }catch(e){
        res.status(400).send({'error':'Please authenticate'})
    }
    
    
}

module.exports=auth;