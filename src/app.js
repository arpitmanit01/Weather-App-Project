var geocode=require("./utils/geocode.js")
var forecast=require("./utils/forecast.js")
var path=require("path");
var express=require("express");
var app=express();
var hbs=require("hbs");

//Views ka configuration
app.set("views",path.join(__dirname,"../templates"));
app.set("view engine","hbs");
hbs.registerPartials(path.join(__dirname,"../templates/partials"));
///////////////
app.use(express.static(path.join(__dirname,"../public")));


app.get("",(req,res)=>{
    res.render("views/index.hbs",{title:"Weather App"});
    });

app.get("/help",(req,res)=>{
res.render("views/help",{msg:"this is just a encoded mxxxg",title:"Help"});
});

app.get("/about",(req,res)=>{
res.render("views/about.hbs",{title:"About"});
});

app.get("/weather",(req,response)=>{
    if(!req.query.address){
        return response.send("Address required in Query");
    }
    var loc=req.query.address;
    geocode(loc,(err,resa)=>{
        if(err){
                return response.send({err:err});
        }
        else{   //console.log(resa);
                forecast(resa.latitude,resa.longitude,(err,res)=>{
                        if(err){
                            return response.send({err:err});
                        }
                        else{   var t={
                            location:resa.place_name,
                            description:res.desc,
                            temperature:res.temp,
                            address:loc
                        };
                        response.send(t);
                        }
                });
        }
        });
}
);


app.get("/help/*",(req,res)=>{
res.render("views/error",{msg:"Article not found under help",title:"Error"});
});

app.get("*",(req,res)=>{
res.render("views/error",{msg:"Page not found",title:"Error 404"});
});

app.listen(3000,()=>{
    console.log("Server started on port 3000");
});
