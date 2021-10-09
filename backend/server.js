//importing npm dependencies
const express = require("express");
const session = require('express-session')
const dotenv = require("dotenv");

dotenv.config();

//importing other dependencies
const doctorRoute=require('./routes/doctor')
const patientRoute=require('./routes/patient')

const app = express();

//declaring middleware usage
app.use(express.urlencoded())
app.use(express.json())
app.use(session({
    secret: 'blackcatnero',
    resave: false,
    saveUninitialized: true
  }))
 
app.use('/doctor',doctorRoute)
app.use('/patient',patientRoute)


//starting app on port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
