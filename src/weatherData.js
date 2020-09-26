const request=require('request')
// const url='http://api.weatherstack.com/current?access_key=08c45ad15f21a85052456441cc7eef86&query=India&units=s'
// request({url : url},(error,response)=>{
//     //console.log(response)
//     if(error){
//         console.log("Error encountered.")
//     }
//     else {
//     const data=JSON.parse(response.body)
//     if(data.error){
//         console.log("Unable to find location")  
//     }else{
//    // console.log("Data in data",data)
//     console.log("It is",data.current.weather_descriptions[0],"out there,and temperature is",data.current.temperature,"degrees.There is a",data.current.precip,"% chance of rain")
//     }
// }
// })

// //Using geocode to get the geographical coordinates of location
// const geo='https://api.mapbox.com/geocoding/v5/mapbox.places/Hyderabad.json?access_token=pk.eyJ1Ijoic2FtcmlkaHlhbGFoaXJpIiwiYSI6ImNrZWZlNm4wcDE0bzAyeHAzbnduejBlcjcifQ.Nruap4SWeQ8FFLojlRq5IQ'
// request({url:geo,json:true},(error,response)=>{
// //const latlong=JSON.parse(response.body)
// //console.log("Value in geo",latlong)
// if(error){
//     console.log("Error in fetching data")
// }else if(response.body.features.length==0){
//     console.log("Invalid location data")
// }else{
// console.log("Longitude",response.body.features[0].center[0],"Latitute",response.body.features[0].center[1])
// }
// })
console.log("Enter location name")

const geocode=(address,weatherReport)=>{
    const geo='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2FtcmlkaHlhbGFoaXJpIiwiYSI6ImNrZWZlNm4wcDE0bzAyeHAzbnduejBlcjcifQ.Nruap4SWeQ8FFLojlRq5IQ'
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
     const data=JSON.parse(response.body)
     if(data.error){
         console.log("Unable to find location")  
     }else{
    
     console.log("It is",data.current.weather_descriptions[0],"out there,and temperature is",data.current.temperature,"degrees.There is a",data.current.precip,"% chance of rain")
     }
 }
})
})
}

