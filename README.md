# node_jan8_2022
# MongoDb

it fall under the category of noSQl
SQL--> structutre query language
NOSQl --> not only structured query language

SQL                             |           No Sql
databse                         |          Database
Table   (Row/Record, Column)    |         Collection (sort of json){document,Field}

https://www.mongodb.com/try/download/community

By default mongo db expects to create  a data directory at root of hard drive but ot convenient.
so we can create a new dolder mongodb-data parallel to mongdb
cd mongodb/bin/mongod --dpath=mongodb-data
run 
/Users/anuj.katoch/Documents/mongodb/bin/mongod --dpath=/Users/anuj.katoch/Documents/mongodb-data

NOTE: cd ~
pwd
this will gve the path of current working dir (/Users/anuj.katoch)


# DATABASE GUI
robo 3T {command:db.version()}
use 127.0.0.1 in place of localhost
right click-->open shell
npm mongodb

# Connect to driver database
useNewUrlParser: so url ia parsed right way.
 while you are connected with only 1 connection  it shows 4-5 open connection cz when we connect ot mongodb it opens a connection pool which ensure that nodejs can communicate quicky while we operate multiple operations.

result.ops is depreciated
 ObjectId
 created by default also called GU Id(global unique identifier)
 generating own obectID
 In Robo 3t we see ObjectId('random of length 24')-> this would return an id of length 12

Read:
 To search via Id
 {_id:new ObjectId("61e3c8c854a0cf6660d4913f") and just the string
 .find return a cursor so we can chain it so we get limited values.
 .count

Promise:
normal callbacks: we can call n no of times but resolve and reject is caled only once and either of them will work.
 
# Mongoose
 Lib to work with node and mongo db, provides easy system for modelling our data.
 eg:
 which all fields are required,the data type for each field, how to ensure a task is created by some useri.e authentication
 Moggose fall in the category of ODM(object document mapper)i.e map your objects in code(nodejs) to documents in monogdb.
 NOTE: Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false.
 __v: 0 : returns version of doc

 # Data validation and sanitization
 validation: age > 18
 sanitization: removing empty spaces

 # REST Api
 Representational State Trnasfer Application programming interface (Rest api or Restful api)
The rest API allows clients such as a Web application to access and manipulate resources using a set of predefined operations.  

 Write : Post /task
 Read : Get /task
 Read : Get /task/:id
 Update : PATCH /task/:id
 Delete :DELETE /task/:id

to implement above operations refer
 methods in mogoose
  https://mongoosejs.com/docs/queries.html  

Status Code
 201: content created

const app = express();
app.use(express.json)==> this ensures the parsing of json into object which can be easily used in req
  https://httpstatuses.com/

  Promise chaining
  in chaining a promise should return another promise
  Promise1().then(val=>{
      ...code
      return Promise2()
  }).then();

  Async await
  async always returns a promise.
  const dowork = async()=>{

  }
  console.log(dowork()) --> Promise{undefined}
  const dowork = async()=>{
      return 'ak'
  }
  console.log(dowork()) --> Promise{'ak'}
  dowork().then()
const dowork = async()=>{
      cont a= await heloo()--> here hello should return a promise
  }

  # note:
  code below await  line will execute only if the promise succeeds else it would stop then and there.
  so for that we use try catch.

 #  Hashing  
 Storing password using hashing (bcryptjs)
 encryption and decrypction are reversilbe but hasing is not reversible
 eg:
 a text password --> hash paswword
 hash password --> back to password (not possible)
 so we compare the hash to continue future testing

 # schema
 When we create a mongoose model, we're passing an object in as the second argument to model.
  Behind the scene Mongoose converts it into  a schema.
  To make use of middleware we have to create schema at our end first.
  const schema=new Mongoose.Schema({})
  schema.pre("save",function(next)) and schema.post
save is the name of event
calling next()determines that async operation is complete.
user is saved.

But how does it know when we're done running our code now?
It could just say when the function is over, but that wouldn't account for any asynchronous process
which might be occurring.
 if we never call next, it's just going to hang forever, thinking that we're still running some
code before we save the user and it will never actually save the user.

# note
certain mongoose operation like update(as it works directly on db) we  bypassed the schema middleware (that's why we used runValidators flag) 

# Login credentails
userSchema.statics.somefunction
this ensures that we can call someFunction directly from User object like 
User.findById
User.someFunction
 
 # Json Web Tokens (JWT)
 jsonwebtoken npm 
 token=jwt.sign({},'some string',{expiresIn:'7 days'})
 value inside the object will be the value that will be embeded in the token.(unique identifier will work)
second arg is used to sign the token to ensure its not hampered.(any series of character)
jwt.verify(token,'some string')
jwt has 3 parts
header 
This is a base64 encoded Jason's string, and this is known as the header.
It contains some meta information about what type of token it is.
It's a JWT and the algorithm that was used to generate it.
payload: This is also a base64 encoded JSON string.
signature:

So the goal of the JSON Web token isn't to hide the data that you've provided right here.
This is actually publicly viewable to anyone who has the token.
They don't need the secret to see that the whole point of the JWT is to create data, this data that's
verifiable via the signature.