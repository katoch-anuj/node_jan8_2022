const app = require("../src/app")
const supertest = require("supertest")
const Task=require("../src/models/task")
const {userOneId, userOne, setupDataBase} = require("./fixtures/db")

beforeEach(setupDataBase)
test("should create a new task",async()=>{
    await supertest(app)
    .post('/task')
    .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
    .send({
        description:'first task'
    })
    .expect(200)
})