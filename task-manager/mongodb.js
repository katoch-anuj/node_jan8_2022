const mongodb = require ("mongodb");

 const {MongoClient,ObjectId} = mongodb;

const id =  new ObjectId();
console.log(id);
console.log(id.getTimestamp());
console.log(id.id); // buffer
console.log(id.id.length); //lenth 12
console.log(id.toHexString().length); //length 24

const databaseName="task-manager";
const connectionURL = "mongodb://127.0.0.1:27017";

MongoClient.connect(connectionURL,{useNewUrlParser:true},(err,client)=>{
    if(err){
        return console.log("some error in connection")
    }
    // const db=client.db(databaseName);
    // db.collection('user').insertOne({
    //     _id:id, //adding manual id
    //     name:'rohn',
    //     age:21
    // },(error,result)=>{
    //     if(error){
    //         return console.log("unable to update the db")
    //     }
    //     console.log(result.acknowledged);
    // })
    // db.collection('task').insertMany([
    //     {
    //         description:"project 1",
    //         completed: true
    //     },
    //     {
    //         description:"project 2",
    //         completed: false
    //     },{
    //         description:"project 3",
    //         completed: true
    //     }
    // ],(error, result)=>{
    //     if (error){
    //         return console.log("data not added");
    //     } console.log(result.insertedCount);
    // })
})