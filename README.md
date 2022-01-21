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


 
