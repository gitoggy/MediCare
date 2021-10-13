//importing required dependencies
const express=require('express')
const session = require('express-session')
const bc=require('bcrypt')
const db = require('../config/database')

const router=express.Router()


//get routes for register and login
router.get('/register',async (req,res)=>{
    res.render('registrationDoctor')
})

router.get('/login',async (req,res)=>{
    res.render('logindoctor')
})

//registering doctor
router.post('/register',async (req,res)=>{
    try{
    //hashing password
    var hashpw=await bc.hash(req.body.password,10)
    //running sql query
    var q={ name:req.body.name,
        specialization:req.body.specialization,
        uprn:req.body.uprn,
        email:req.body.email,
        password:hashpw,
        phone:req.body.phone,
        address:req.body.address,
        experience:req.body.experience,
        education:req.body.education,
        }
    var sql='INSERT INTO doctor_info SET ?'
    db.query(sql,q,(error,result)=>{
        if(error) throw error
        res.redirect('/doctor/login')
    })
    }
    catch(err){
        res.send(err)
    }
    })


//login as doctor
router.post('/login', (req,res)=>{
    var sql=`SELECT * FROM doctor_info WHERE email='${req.body.email}'`
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
                req.session.isDoctor=true;
                res.send( req.session.email + " you have been logged in");
            }
            else{
                res.send('invalid email or password')
            }
            })
        
    })
})


//exporting router
module.exports = router;


