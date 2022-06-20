const express= require('express');
const https=require("https");  //we don't need to install this module since it is native module
const bodyParser = require("body-parser")

const app=express();
app.use(bodyParser.urlencoded());

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html");
    
})

app.post("/", function(req,res){
    var query=req.body.city;
    //saving url in a const for further use... must include "https://" in the url which is often neglected
    const url= "https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid=c7c4726c7452ec3391bb1324e54015a2"
    
    //this line creates a http get request to an external server using url with the help of API of that external server
    //function parameter is taken as "response" to avoid confusion
    https.get(url,function(response){
        console.log(response.statusCode);

        //this function responds to actual data that the external server has sent us
        response.on("data", function(data){
            //here the data that we get is in hexadecimal and we need to convert it into js object which is done using JSON.parse()
            const weatherData = JSON.parse(data);
            //we will extract our required object from the nested object that we got
            //we can copy the path using "JSON viewer awesome" extension
            const temp= weatherData.main.temp; 
            //we can have only one res.send() and if we want to send multiple lines then we canm use res.write() and at last res.send() to send all
            res.send("<h1>The temperature : "+temp+"</h1>");

        })
    } )

})


//this function gets called when server ios started at port 3000
app.listen(3000, function(){
    //this messege is sent at git bash
    console.log("Server running..!")
})

//apikey = c7c4726c7452ec3391bb1324e54015a2