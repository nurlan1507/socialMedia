require('dotenv').config();
const express = require('express');
const passport = require('passport');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./src/middlewares/errorHandler');


const app = express();
const http = require('http');
const server = http.createServer(app)
const SocketService = require('./socket/socket');
const {Server} = require('socket.io');
const io = new Server(server,{cors:{
    origin:process.env.CLIENT_URL
    }})
io.on('connection',socket => SocketService(socket))




app.use(cookieParser());
//database
const db= require('./database/mySqlModels');


//routes
const authRoute= require('./src/routes/authRoute');
//middlewares

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
}))
app.use(express.json());
app.use(passport.initialize());
app.use('/api', authRoute);

app.use(errorMiddleware);


const start=async()=>{
    server.listen(process.env.PORT || 8080 , ()=>{
        console.log(`http://localhost:8080`);
    });
};



start();
