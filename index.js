require('dotenv').config();
const express = require('express');
const cors = require('cors');


const app = express();

const start=()=>{
    app.listen(process.env.PORT || 8080 , ()=>{
        console.log(`http://localhost:8080`);
    })
};

start();
