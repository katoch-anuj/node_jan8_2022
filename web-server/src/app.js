const express = require('express'); // express doesn't return an object but a fucntion itself
const path= require('path');

const app = express();

const publicPath=path.join(__dirname,'../public');
//to tell express js which template engine we installed
app.set('view engine','hbs')

//static defines that the page served is static
app.use(express.static(publicPath));// this wont return anything cz index.html is absent if index.html is present then this will execuet and not dynamic depending upon the sequencing.

app.get("",(req,res)=>{
    res.render('index',{
        title:'dynamic title for hbs'
    });
})
app.get('weather',(req,res)=>{
    res.send('weather')
})

app.listen(4000,()=>{ // this is imp to start the express server and mention port
    console.log('server started listening on port 4000');
})