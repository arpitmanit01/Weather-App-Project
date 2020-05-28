console.log("Client Side JS is loaded");




var form=document.querySelector("form");
var input=document.querySelector("input");
var msg1=document.querySelector("#msg1")
var msg2=document.querySelector("#msg2")
var msg3=document.querySelector("#msg3")
var msg4=document.querySelector("#msg4")

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    var text=input.value;
    fetch("http://localhost:3000/weather?address="+text).then((res)=>{
    res.json().then((data)=>{
        if(data.err){
            msg1.textContent=data.err;
            msg2.textContent="";
            msg3.textContent="";
            msg4.textContent="";
        }
        else{
            console.log(data);
            msg1.textContent="";
            msg2.textContent="Location      :"+data.location;
            msg3.textContent="Description   :"+data.description;
            msg4.textContent="Temperature   :"+data.temperature+"°C";
        }
    })
})
})