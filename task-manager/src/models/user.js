const mongoose = require("mongoose");
var validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const task= require('./task')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("email is wrong");
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("not a valid age")
            }
        }
    },
    password: {
        type: String,
        trim: true,
        required: true,
        minLength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error("password is not acceptable")
            }
        }

    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
}); 

userSchema.methods.toJSON = function (){
    const user = this;
    // this is very imp as user represents mongoose object and not js object.To get an actual JavaScript object you have to call  toObject()
   //and we want to ensure that.toJSON return a native js object.
    const userObject = user.toObject(); 
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}

//method ensure tht function can be called on user instance
userSchema.methods.generateJwtToken = async function() {
    const user=this;
    // console.log(user._id) //returns new ObjectId("61eed7cf646a47f45e2a21b2")
    // console.log(user._id.toString()); // return 61eed7cf646a47f45e2a21b2
    //creating a token
    const token = jwt.sign({_id:user._id.toString()},'thisismyproject');
    user.tokens.push({token})
    // user.tokens = user.tokens.concat({token})
    await user.save()//creates a sub document which has its own id
    return token;

}
//statics ensures that we can use this function directly on User model
userSchema.statics.findByCredentials= async (email,password)=>{
    const user =await  User.findOne({email});
    if(!user){
        throw new Error("not able to login")
    }
    if(user){
        const isCompare = await bcrypt.compare(password,user.password);
        if(!isCompare){
            throw new Error("not able to login")
        }
        return user;
    }
}

//delete user along with all th etask associated with it
userSchema.pre("remove", async function(next){
    const user=this;
    await task.deleteMany({owner:user._id})
    next()
})

//pre hook to hash password before saving
userSchema.pre("save", async function(next){
    const user= this;
    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password,8); // to convert into hash 8 is th elevel of hashing too much makes it very slow and too low value not good for security point
    //to compare hash
    // await bcrypt.compare(passowrd,hash)
    // console.log("before saving")
    }
    next()
})
const User = mongoose.model("User",userSchema);



module.exports = User;