require('dotenv').config();
const express = require('express');
const cors = require('cors');

//database
const db= require('./database/mySqlModels');

const app = express();
//routes
const authRoute= require('./src/routes/authRoute');
//middlewares
app.use('/api', authRoute);



const start=async()=>{
    app.listen(process.env.PORT || 8080 , ()=>{
        console.log(`http://localhost:8080`);
    });
};

start();
