const passport = require('passport');
const sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../../database/mySqlModels');
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
);


//login
passport.use(
    'login',
    new LocalStrategy({
        usernameField:"email",
        passwordField:"password",
        session: false,
    }, async(email,password,done)=>{
        try{
            const userInDb = await db.users.findOne({where:{email:email}});
            if(!userInDb){
                return done(null,false,{msg:"incorrect email or password"});
            }
            const passMatch =await bcrypt.compare(password, userInDb.hashedPassword);
            if(!passMatch){
                return done(null,false,{msg:"password do not match"});
            }
            return done(null,userInDb);
        }catch (e) {
            console.log(e)
            done(null,false,{msg:e});
        }
    })
);


module.exports = passport;

