//importing required dependencies
const express=require('express')
const bc=require('bcrypt')
const db = require('../config/database')
const authPatient= require('../authenticaton/authPatient')

const router=express.Router()

//registering patient
router.post('/register',async (req,res)=>{
    try{
    //hashing password
    var hashpw=await bc.hash(req.body.password,10)
    //running sql query
    var q={ name:req.body.name,email:req.body.email,password:hashpw,phone:req.body.phone,address:req.body.address}
    var sql='INSERT INTO patient_info SET ?'
    db.query(sql,q,(error,result)=>{
        if(error) throw error
        res.send('user registered')
    })
    }
    catch(err){
        res.send(err)
    }
})

//login as patient
router.post('/login', (req,res)=>{
    var sql=`SELECT * FROM patient_info WHERE email='${req.body.email}'`
    db.query(sql, (err,result)=>{
        if(err) throw err
        if(!result)
        res.send('record not found')
        //decrypt password and compare
        bc.compare(req.body.password,result[0].password,(er,re)=>{
            if(er) throw er
            if(re){
                //store values in session
                req.session.email=req.body.email;
                req.session.isPatient=true;
                res.send( req.session.email + "you have been logged in");
            }
            else{
                res.send('invalid email or password')
            }
            })
        
    })
})

//route to find nearby doctors
router.get('/find',authPatient,(req,res)=>{
    var sql=`SELECT * FROM doctor_info`
    db.query(sql,(err,result)=>{
        if(err) throw err
        res.send(result);
    })
})

//exporting router
module.exports = router;


