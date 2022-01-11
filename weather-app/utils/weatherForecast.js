const request = require('postman-request');

const forecast= (lat,long,callback) =>{
    const weatherAPi =
        `http://api.weatherstack.com/current?access_key=3aef8fbf006073d3a5d2241f5e03480c&query=${lat},${long}&units=m`;
    request.get({url:weatherAPi,json:true},(error,{body})=>{
          if (error) {
    callback("cannot connect to weather api");
  }
  else if(body.error){
      callback('Something went wrong')
  }
   else {
    const data = body.current;
    callback(error,
      "it is currently " +
        data.temperature +
        " degrees out.It feels like " +
        data.feelslike +
        " degrees"
    );
  }
    })
}

module.exports=forecast;