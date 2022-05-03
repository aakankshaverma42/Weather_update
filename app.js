const { query } = require("express");
const express = require("express");
const { STATUS_CODES } = require("http");
const https = require("https");
var bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.urlencoded({extented: true}));
app.get('/',function(req,res){
    res.sendFile(__dirname +"/index.html")  
});

app.post('/',function(req,res){  
 const query=req.body.CityName;
  //  const apikey= " 44f367097b483d5fa4aff7da99bfa546" ; 
  //  const unit= "metrix";
  //  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +" &appid="+apikey+" &units  ="+unit;
  const url = "https://api.openweathermap.org/data/2.5/weather?q=london&appid=44f367097b483d5fa4aff7da99bfa546&units=metrix";


   https.get(url,function(response){
       console.log (response.statusCode);

        response.on('data',function(data){
          
            const weatherdata=JSON.parse(data)
            
            const humidity= weatherdata.main.humidity;
            const temperture =weatherdata.main.temp
            const description =weatherdata.weather[0].description
           
           console.log(humidity)
           console.log(temperture)
           console.log(description)
           res.write("<p>The humidity of the weather is "+ humidity + "<p>");
           res.write( "<p>The description of the weather will be "+ description + "<p>");    
           res.write("<h1>The temp of the weather is  "+ temperture + " degree calcius</h1>"); 
          res.send()
       })
         
          
           })
})

app.listen(3000,function(){
    console.log("server is running at port 3000")
})
