var request=require("request");

var forecast=function(lat,long,callback){
    if(typeof(long)!=="number"){
            callback("Not valid coordinatesp",undefined);
    }
    else if(typeof(lat)!=="number"){
            callback("Not valid coordinatesq",undefined);
    }
    else{
            request({url:"http://api.weatherstack.com/current?access_key=aa1c2a0e7122b115a672e8f47b5b80e1&query="+lat+","+long+"&units=m",json:true},
            
            function(err,res){
                    if(err){
                            callback("Unable to connect to Weather API",undefined);
                    }
                    else if(res.body.location.name==null){
                            callback("Not valid coordinatesr",undefined);
                    }
                    else{   var t={};
                    t.temp=res.body.current.temperature;
                    t.desc=res.body.current.weather_descriptions[0];
                    callback(undefined,t);
                    }
            }
            );
    }
}

module.exports=forecast;