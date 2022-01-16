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
userNewUrlParser: so url ia parsed right way.
 while you are connected with only 1 connection  it shows 4-5 open connection cz when we connect ot mongodb it opens a connection pool which ensure that nodejs can communicate quicky while we operate multiple operations.

result.ops is depreciated
 ObjectId
 created by default also called GU Id(global unique identifier)
 generating own obectID
 In Robo #t we see ObjectId('random of length 24')-> this would return an id of length 12

 