var request=require("request");

var geocode=function(location,callback){
    request({url:"https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(location)+".json?access_token=pk.eyJ1Ijoiam94b2hhOTY1NSIsImEiOiJja2FubjlnbXcxZnF1MnpwNnE3YnAwc3VjIn0.6XqHfav1mFnvJtBMfp3nCA&fuzzyMatch=true",
    json:true},
    function(err,res){
            if(err){
                    callback("Unable to connect to location service",undefined);
            }
            else if(res.body.features.length===0){
                    callback("No Location found search again!",undefined);
            }
            else{   var t={};
                    t.longitude=res.body.features[0].center[0];
                    t.latitude=res.body.features[0].center[1];
                    t.place_name=res.body.features[0].place_name;
                    callback(undefined,t);
            }
    }
    );
}

module.exports=geocode;