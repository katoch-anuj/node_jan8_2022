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

# generating auth token
userSchema.statics.function --> the function is accessible on the model(model method)
userSchema.methods.function --> the function is accessible to the instance(instance method)

while adding tokens to model as an array of object there is an extra id that is generated.
this is known as sub document and like regular document it has its own id generated to it.

# Express Middleware
without middleware --> request --> route handler
with middleare --> request --> dosomething --> route handler

Register a middleware(should be on very top)
app.use((req,res,next)=>{ 

})
the function provided will run before theroute handler is called.
if next() is not called route handler will never be executed

using it with app ensure that the middleware is associated with every route.

using it with specific route only:
All we do is pass it in as an argument to the get method before we pass in our route.
router.get('/user',middleware function,aync())

sending in header
Authorization: Bearer token

# Postman
environment varaible to use --> {{}}
header--> authorization-->Bearer token--> this also serves same purpose
so we will go to collection and set auth token there and in respective api we will select inherit auth from parent

To get the token move automatically from login or create user
if(pm.response.code === 200){
    pm.environment.set('authToken',pm.response.json().token)
}
# hiding private data
userSchema.methods.toJSON

whenever we use res.send() --> it internally calls JSON.stringify
whenever JSON.stringify gets called toJSON is called.

eg:
const pet ={name:'cat'}
 pet.toJSON =function(){
   return this /*** this this will return the object ***/
  return {}
 }
 console.log(JSON.stringify(pet)) /*** if empty object is returned from top this will return {} ***/

.toObject() --> converts mongoose object to js object.
findByIdAndDelete is replaced by .remove()

# NOTE
execpopulate is not required(depricated most prob)
# user task relation
  either task can save user or vice versa
 task will save  user
1> task model mein will add owner.
owner{
  type:mongoose.Schema.Types.ObjectId // so this is saying that the data stored in owner is going to be an object ID and that's correct.
}
const task= await Task.findById('id value')
console.log(task.owner) // will return only the id
To get more details of the user we have to fire another query wit respective user  id.
Mongoose help to avoid this by providing helper fucntion and some relation.
to link between taks and USer so as to fetch the user data we use:

ref:'User' // the model we want to refer  add this to the task model as property for owner
task.populate('owner').execPopulate() // to populate the user
console.log(task.owner) // without ref this will return only id as we have set only id in task model but after setting ref we can access the entire user 

To reverse the linking above i.e search by user id and find the task related to it
user.tasks --> undefined

Virtual Property-->A virtual property is not actual data stored in the database.(only for mongoose)
It's a relationship between two entities, in this case, between our user and our task.
first para is the name of virtual field and it can be anything
userSchema.virtual('myTask',{
  ref:"Task", // which model to populate documents from
  localField:'_id' // refers to the user model
  foreignfield:'owner' // refer to ref model 
})
Mongoose will populate documents from the model in ref whose foreignField matches this document's localField.
user.populate('myTask').execPopulate()

# Sorting Pagination and Filtering

timestamps:true --> in model creates createdAt and updatedAt
Filtering

req.populate({
  path:'task',
  match:{
    completed:true
  },
  // for pagination
  options:{
    limit:2,
    skip:1,
    sort:{
    createdAt: 1 // 1 for ascending -1 for descending
  }
  },

})

# file uploads
multer npm

for handling multipart/form-data

const upload = multer({
    dest:'imgaes // destination
})

upload.single('upload') --> returns middleware ,
 upload is name of the file that multer will check  for uploading.(should have same name in form-data)

 app.post('/uploads',upload.single('upload),(req,res)=>{

 })

 Validation
 const upload = multer({
    dest:'imgaes, // destination
    limits:{
      filesize:1000000 
    },
    //this function runs when any new file is uploaded called internally by multer
   req: request made, file: file to be uploaded and then call cb
    fileFilter(req,file,cb)=>{
      file.originalname
      cb(new Error('')); // file not uploaded and error msg
      cb(undefined,true) // file uploaded
      cd(undefined, false) // file not uploaded
    }
})

We can access th eimage buffer in our route only when we havent defined the dest in config for multer
router.post('/users/me/avatar',upload.single('avatar'),(req,res)=>{
  req.file.buffer
})

to test: <img src="data:image/jpg;base64,{{binary data}}">
regex101.com

Setting header

res.set("content-Type","application/json")--> done for json by default by express
res.set("content-Type","image/jpg")
Image can be accessed via
src=http://localhost:4000/users/61f820e7620701cebd3c27df/avatar

# auto cropping
sharp npm

# send emails
SendGrid
npm i @sendgrid/mail

Setting--> single sender verification

# Environment Variable setting
env-cmd --save-dev (npm module)

# production
MongoDb atlas
0.0.0.0/0 --> whitelist all ip

SRV record -->
come from DNS
# Setting env variable in heroku
 heroku config:set key=value
 heroku config:unset key
