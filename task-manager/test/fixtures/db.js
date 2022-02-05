
const jwt = require("jsonwebtoken");
const mongoose =  require("mongoose");
const User = require("../../src/models/user")

const userOneId=new mongoose.Types.ObjectId; // creates an id new ObjectId("61fcd0e95bc3b3c7592054ac")
const userOne={
    '_id':userOneId,
    name:"test name",
    email:"dummy@gmail.com",
    password:"test@123",
    tokens:[{
        token:jwt.sign({_id:userOneId.toString()},process.env.JWT_SECRET)
    }]
};

const setupDataBase = async()=>{
    await User.deleteMany();
    await new User(userOne).save();
}

module.exports = {
    userOneId,
    userOne,
    setupDataBase
}