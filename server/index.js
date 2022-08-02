require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./src/middlewares/errorHandler');
const app = express();
app.use(cookieParser());
//database
const db= require('./database/mySqlModels');


//routes
const authRoute= require('./src/routes/authRoute');
//middlewares

app.use(cors({

}))
app.use(express.json());
app.use(passport.initialize());
app.use('/api', authRoute);

// app.use(errorMiddleware);


const start=async()=>{
    app.listen(process.env.PORT || 8080 , ()=>{
        console.log(`http://localhost:8080`);
    });
};



start();
