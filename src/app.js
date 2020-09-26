const path = require('path')
const express=require('express')
const { text } = require('body-parser')
const { Module } = require('module')
const app=express()
const hbs=require('hbs')
const request=require('request')

//Set up path for express to access the HTML file 
console.log(__dirname)
console.log(path.join(__dirname, '../public')) //used for going to the other file index.html from app.js
const viewsPath = path.join(__dirname, '/views')
const partialPath=path.join(__dirname,'/partials')

//Set up handel bar to make dynamic html codes
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Set up static directory to server
app.use(express.static(path.join(__dirname,'../public')))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Sam'
    })
})



app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About",
        name:"Sam"
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help",
        message:"This page gives data about BTS",
        name:"Sam"
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404page',{
        title:"404",
        message:"ERROR 404 : Help Page For The Content Not Found",
        name:"Sam"
    })
})

app.get('/weather',(req,res)=>{
    var data, forecaste,precipitation,temperature
    if(!req.query.address){
       return res.send({
            error:'You must enter a address'
        })
    }
    address=req.query.address
    console.log("Addr=",address)
    console.log(req.query)
    const geocode=(address,weatherReport)=>{
        const geo='https://api.mapbox.com/geocoding/v5/mapbox.places/'+req.query.address+'.json?access_token=pk.eyJ1Ijoic2FtcmlkaHlhbGFoaXJpIiwiYSI6ImNrZWZlNm4wcDE0bzAyeHAzbnduejBlcjcifQ.Nruap4SWeQ8FFLojlRq5IQ'
        request({url:geo,json:true},(error,response)=>{
             if(error){
                 console.log("Error in fetching data")
             }else if(response.body.features.length==0){
                 console.log("Invalid location data")
             }else{
             
             
             console.log("Location: ",response.body.features[0].place_name)
             weatherReport(response.body.features[0].center[0],response.body.features[0].center[1])
    
            }
             })
    
    
    }
    
    if(! process.argv[2])
    {
        console.log("No address entered")
    }else{
    geocode(process.argv[2],(long,lat)=>{
        const url='http://api.weatherstack.com/current?access_key=08c45ad15f21a85052456441cc7eef86&query='+lat+','+long+'&units=f'
     request({url : url},(error,response)=>{
         //console.log(response)
         if(error){
             console.log("Error encountered.")
         }
         else {
         data=JSON.parse(response.body)
         if(data.error){
             console.log("Unable to find location")  
         }else{
        
         console.log("It is",data.current.weather_descriptions[0],"out there,and temperature is",data.current.temperature,"degrees.There is a",data.current.precip,"% chance of rain")
         }
         forecaste=data.current.weather_descriptions[0]
         precipitation=data.current.precip
         temperature=data.current.temperature
         console.log(forecaste,temperature,precipitation)

         res.send({
            forecast:forecaste,
            temperature:temperature,
            precipitation:precipitation,
            address:req.query.address,
            title:'Weather Data',
            name:'Sam'
        })
         
     }
    })
    })
    }
    // res.send({
    //     forecast:forecaste,
    //     temperature:temperature,
    //     precipitation:precipitation,
    //     address:req.query.address
    // })
})



//For invalid URLs
app.get('*',(req,res)=>{
    res.render('404page',{
        title:"404",
        message:"ERROR 404: Page Not Found ",
        name:"Sam"
    })
})

//app.use(express.static(path.join(__dirname,'../public')))

// app.get('/weather',(req,res)=>{
//     res.send({
//         forecast:'Its rainy',
//         location:'Aswapuram'
//     })
// })




app.listen(3000,()=>{
    console.log("Port 3000 is started")
})


