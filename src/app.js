const express = require('express'); // express doesn't return an object but a fucntion itself
const path= require('path');
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/weatherForecast')

const port = process.env.PORT || 4000;
const app = express();
//to use partials
const hbs = require('hbs');
const { response } = require('express');

//Setting path for express config
const publicPath=path.join(__dirname,'../public');
const hbsViewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials') //partials path

//to tell express js which template engine we installed
app.set('view engine','hbs')
//update default views folder with new path created
app.set('views',hbsViewsPath)
hbs.registerPartials(partialPath);

//static defines that the page served is static
app.use(express.static(publicPath));// this wont return anything cz index.html is absent if index.html is present then this will execuet and not dynamic depending upon the sequencing.

app.get("",(req,res)=>{
    res.render('index',{
        title:'Weather',
        description:"Use this site to get your weather",
        footer:"Created by Anuj"
    });
})

app.get("/about",(req,res)=>{
    res.render('about',{
        title:'About',
        description:'lorem ipsum',
        footer:"Created by Anuj"
    })
})
app.get("/help",(req,res)=>{
    res.render('help',{
        title:'Help',
        description:'This is for your help',
        footer:"Created by Anuj"
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please enter the address"
        })
    }
    geoCode(req.query.address,(err,{lat,long,place}={})=>{
        if (err){
            return res.send({
                error:err
            })
        }
        forecast(lat,long,(err,response)=>{
            if (err){
                return res.send({
                    error:err,
                })
            }
            res.send({
                weather:response,
                location:place,
                address:req.query.address
    
            })
        })
        
    })
    
})

app.get("*",(req,res)=>{
    res.render("404",{
        errorMsg:'404 page not found'
    })
})

app.listen(port,()=>{ // this is imp to start the express server and mention port
    console.log('server started listening on port '+ port);
})