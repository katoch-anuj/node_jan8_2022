const request = require('postman-request');

const geoCode = (location,callback)=>{
    const url= `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoiYW51amthdG9jaCIsImEiOiJja2I4ZHBuemMwMzg3MnNwaGJybzU4NDZyIn0.mYiL4nJuxVofLPTXW3Ln0A&limit=1`;
    request.get({url,json:true},(error,{body})=>{
          if (error) {
    callback("cannot connect to Geo api");
  }
  else if(body.features.length===0){
    callback('lat long not found')
} else {
    const { center,place_name } = body.features[0];
    // callback(error,`latitude ${center[1]} longitude: ${center[0]} place: ${place_name}`)
    callback(error,{'lat':center[1],'long': center[0],place:place_name})
  }
    })
}

module.exports=geoCode;
