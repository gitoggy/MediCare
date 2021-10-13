const express=require('express')
const db = require('../config/database')

const router=express.Router()


//this fuction was taken from the internet

function distance(lat1,lon1,lat2, lon2)
{

// The math module contains a function
// named toRadians which converts from
// degrees to radians.
lon1 =  lon1 * Math.PI / 180;
lon2 = lon2 * Math.PI / 180;
lat1 = lat1 * Math.PI / 180;
lat2 = lat2 * Math.PI / 180;

// Haversine formula
let dlon = lon2 - lon1;
let dlat = lat2 - lat1;
let a = Math.pow(Math.sin(dlat / 2), 2)
+ Math.cos(lat1) * Math.cos(lat2)
* Math.pow(Math.sin(dlon / 2),2);

let c = 2 * Math.asin(Math.sqrt(a));

// Radius of earth in kilometers. Use 3956
// for miles
let r = 6371;

// calculate the result
return(c * r);
}


router.post('/patient', (req, res) => {
    console.log(req.body)
})

router.post('/doctor', (req, res) => {
    console.log(req.body)
})


// {/* <script>
//         if('geolocation' in navigator){
//         console.log('geolocation available')
//     }
//     navigator.geolocation.getCurrentPosition(function(position){
//        let lat=(position.coords.latitude)
//         let lon=(position.coords.longitude)
//         const data={lat,lon}
//     const options={
//         method:'POST',
//         headers:{
//             'Content-Type':'application/json'
//         },
//         body:JSON.stringify(data)
//     }
//     fetch('/getLocation',options)
//     })
    
//     </script> */}


module.exports=router;