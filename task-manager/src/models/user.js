const mongoose = require ("mongoose");
var validator = require('validator');

const User = mongoose.model("User",{
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email is wrong");
            }
        }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error("not a valid age")
            }
        }
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minLength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("password is not acceptable")
            }
        }

    }
});

module.exports = User;