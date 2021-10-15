const express=require('express')
const db = require('../config/database')

const router=express.Router()





router.post('/patient', (req, res) => {
let sql = `UPDATE patient_info SET lat='${req.body.lat}' , lon='${req.body.lon}' WHERE email='${req.session.mail}'`
db.query(sql,(err,result)=>{
    if(err) throw err
})
})

router.post('/doctor', (req, res) => {
    var q={ lat:req.body.lat,
            lon:req.body.lon,
            doctor_email:req.session.mail
            }
    var sql='INSERT INTO doctor_loc SET ?'
    db.query(sql,q,(err,result)=>{
        if(err) throw err
        res.render('loginDoctor');
    })
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