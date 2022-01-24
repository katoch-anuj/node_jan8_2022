const mongoose = require("mongoose");
var validator = require('validator');
const bcrypt = require("bcryptjs");

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

    }
}); 
userSchema.pre("save", async function(next){
    const user= this;
    if(user.isModified('password')){
        user.password= await bcrypt.hash(user.password,8); // to convert into hash 8 is th elevel of hashing too much makes it very slow and too low value not good for security point
    //to compare hash
    // await bcrypt.compare(passowrd,hash)
    console.log("before saving")
    }
    
    
    next()
})
const User = mongoose.model("User",userSchema);



module.exports = User;