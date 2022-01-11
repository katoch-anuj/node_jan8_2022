const express = require('express'); // express doesn't return an object but a fucntion itself
const path= require('path');

const app = express();

// console.log(__dirname);
console.log(path.join(__dirname,'../public')); //this is done to get the path value

const publicPath=path.join(__dirname,'../public');

app.use(express.static(publicPath)); //this tells express to use the file from path for default route so default route is never served as its value is  index.html
// if its index1.html the default route will be served


//creating routes
app.get('',(req,res)=>{ //req --> request res-->response (Default route)
    res.send("<h1>this is home page</h1>") // this will send data either to browser if call is made from browser or postman require if call is made from server
})


app.get('/help',(req,res)=>{
    res.send({   //express will automatically stringify the object to string
        name:'test',
        age:27
    });
})
app.get('/weather',(req,res)=>{
    res.send('weather')
})
app.get('/about',(req,res)=>{
    res.send('about')
})

app.listen(4000,()=>{ // this is imp to start the express server and mention port
    console.log('server started listening on port 4000');
})