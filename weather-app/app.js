const geoCode = require("./utils/geoCode.js")
const weatherForecast = require("./utils/weatherForecast.js")

const address=process.argv[2];
if(!address){
    console.log("please provide address")
}else{
geoCode(process.argv[2],(error,{lat,long,place}={})=>{
    if(error){
         return console.log(error);
    }
    weatherForecast(lat,long,(error,response)=>{
        if(error){
            return console.log(error);
        }
        console.log(place)
        console.log(response)
    });
    
});
}