const app = require("../src/app")
const supertest = require("supertest")
const User=require("../src/models/user")
const {userOneId, userOne, setupDataBase} = require("./fixtures/db")

// const userOneId=new mongoose.Schema.Types.ObjectId; 
// return ObjectId {
//     path: undefined,
//     instance: 'ObjectID',
//     validators: [],
//     getters: [],
//     setters: [],
//     options: SchemaObjectIdOptions {},
//     _index: null,
//     [Symbol(mongoose#schemaType)]: true
//   }

beforeEach(setupDataBase)
afterEach(()=>{
    
})


test("should signup a new user",async ()=>{
    const response = await supertest(app).post("/user").send({
        name:"anuj",
        email:"katoch.anuj92@gmail.com",
        password:"dummy@123"
    }).expect(200)
    const user = await User.findById({_id:response.body.user._id})
    expect(user).not.toBeNull()
    expect(response.body.user).toMatchObject({
        name:'anuj',
        email:'katoch.anuj92@gmail.com',
    })
    expect(user.password).not.toBe('dummy@123')

})
test("should login existing user",async ()=>{
    const response=await supertest(app).post("/user/login").send({
        email:userOne.email,
        password:userOne.password
    }).expect(200)
    const user =await User.findById({_id:response.body.user._id});
    expect(response.body.token).toBe(user.tokens[1].token)

    
})

test("should not login new user",async ()=>{
    await supertest(app).post("/user/login").send({
        email:userOne.email,
        password:"user.password"
    }).expect(400)
})

test("should get profile for authenticated user", async()=>{
    await supertest(app)
    .get("/users/me")
    .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})
test("should not get profile for non-authenticated user", async()=>{
    await supertest(app)
    .get("/users/me")
    .send()
    .expect(400)
})

test("should delete authenticated user",async()=>{
    await supertest(app)
    .delete("/users/me")
    .set("Authorization",`Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

    const user = await User.findById(userOneId);
    expect(user).toBeNull();
   
})
test("should not delete un-authenticated user",async()=>{
    await supertest(app)
    .delete("/users/me")
    .send()
    .expect(400)
})

test("should check if image is uploaded successfully", async ()=>{
    await supertest(app)
    .post('/users/me/avatar')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .attach('avatar','test/fixtures/profile-pic.jpg')
    .expect(200)
    const user =await User.findById(userOneId); 
    expect(user.avatar).toEqual(expect.any(Buffer));
})
test("should update valid user fiedls",async ()=>{
    await supertest(app)
    .patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        name:"test name updated"
    })
    .expect(200)
    const user = await User.findById(userOneId);
    expect(user.name).toBe('test name updated')
})

test("should not update invalid user fields",async ()=>{
    await supertest(app)
    .patch('/users/me')
    .set('Authorization',`Bearer ${userOne.tokens[0].token}`)
    .send({
        name1:"test name updated"
    })
    .expect(400)
})