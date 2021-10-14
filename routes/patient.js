//importing required dependencies
const express=require('express')
const bc=require('bcrypt')
const db = require('../config/database')
const authPatient= require('../authenticaton/authPatient')
const path=require('path')


const router=express.Router()


//get routes for register and login
router.get('/register',async (req,res)=>{
    res.render('registrationPatient')
})

router.get('/login',async (req,res)=>{
    res.render('loginpatient')
})

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
        res.redirect('/patient/login')
    })
    }
    catch(err){
        throw err;
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
                res.send( req.session.email + "you have been logged in redirect to find page here");
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
        res.render('doctorCard',{doctor:result});
    })
})

//selecting doctor and adding to session
router.get('/find/:id',authPatient,(req,res)=>{ 
    let doc_id=req.params.id;
    req.session.app_doctor=doc_id;
    res.redirect('/patient/book');
})

//route to booking form
router.get('/book',authPatient,(req,res)=>{
    if(!req.session.app_doctor) res.send("find doc first")
    res.send('booking form should be here')
})

//route to insert booking information to database
router.post('/book',authPatient,(req,res)=>{
    if(!req.session.app_doctor) res.send("find doc first")

    //inserting uploaded files
    if(req.files){
        var file=req.files.filename,
        filename=file.name;
        file.mv('../upload/'+filename,function(err){
            if(err) res.send('an error occured')
        })
    }

    var q={ patient_email:req.session.email,
            symptom:req.body.symptom,
            date:req.body.date,
            time:req.body.time,
            doctor_id:req.session.app_doctor,
            upload:`/backend/upload/${filename}`
            }
    var sql='INSERT INTO patient_app SET ?'
    db.query(sql,q,(err,result)=>{
        if(err) throw err
        res.send(result);
    })
})

//exporting router
module.exports = router;


