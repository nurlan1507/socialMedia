require('dotenv').config();
const express = require('express');
const cors = require('cors');
const errorMiddleware = require('./src/middlewares/errorHandler');
const app = express();
//database
const db= require('./database/mySqlModels');


//routes
const authRoute= require('./src/routes/authRoute');
//middlewares
app.use(express.json());
app.use('/api', authRoute);
app.use(errorMiddleware);


const start=async()=>{
    app.listen(process.env.PORT || 8080 , ()=>{
        console.log(`http://localhost:8080`);
    });
};

start();
