const mongoose = require ("mongoose");
var validator = require('validator');

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api");

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
})

const me = new User({
    name:" Anuj",
    email:"  HELLOd@yap.com",
    password: "   sometthing!23"
});

me.save().then(result=>{
    console.log(result);
}).catch(error=>{
    console.log("error",error)
})

// const Task = mongoose.model("Task",{
//     description:String,
//     completed:Boolean
// });

// const taskOb = new Task({
//     description:"here is project",
//     completed:true
// })

// taskOb.save().then(result=>{
//     console.log(result)
// }).catch(error=>{
//     console.log(error)
// })