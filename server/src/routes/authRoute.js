const express = require('express');
const router = express.Router();
const passport = require('passport');
const {check,body}= require('express-validator');
const db = require('../../database/mySqlModels');
const authController = require('../controllers/authController');
const bcrypt = require("bcrypt");


//validator
const checkEmail = body('email', "email is not valid").isEmail();
const checkPassword = body('password', "password is no valid").isLength({min:6, max:30}).exists()
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    'register',
    new LocalStrategy({
        usernameField:"email",
        passwordField:"password",
        passReqToCallback: true,
        session: false,
    }, async(req,email,password,done)=>{
        try{
            const email = req.body.email;
            const password = req.body.password
            const checkUser = await db.users.findOne({
                where:{
                    email:email
                },raw:1})
            if(checkUser){
                return done(null,false,{msg:"user already exists"});
            }
            const hashPassword = await bcrypt.hash(password,10);
            const newUser = await db.users.create({email:email,hashedPassword:hashPassword});
             return done(null,newUser);
        }catch (e) {
            return e
        }
    })
)

router.post('/register',[ body('email', "email is not valid").isEmail(), body('password', "password is no valid").isLength({min:6, max:30})],authController.register);
router.post('/login', authController.login);
router.post('/registerUser' , (req,res,next)=>{
     passport.authenticate('register',async(err,user,info)=>{
        if(err){
            return res.json({msg:"error during registration occured"}).status(400)
        }
        if(info!== undefined){
            res.status(403).json({msg:info.msg})
        }else{
          req.logIn(user,async(error)=>{
                const {username,email} = req.body;
                 console.log(username)
                await user.update({
                    username:username,
                    email:email
                })

              return res.json(user).status(200);
            })
        }
    })(req,res,next)
})

module.exports = router;