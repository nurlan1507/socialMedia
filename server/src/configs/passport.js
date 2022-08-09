const passport = require('passport');
const sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../../database/mySqlModels');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

//google account autentification
const googleStrategy = require('passport-google-oidc');


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
            const password = req.body.password;
            const repeat_password = req.body.repeat_password;
            console.log(email,password,repeat_password)
            if(password !== repeat_password)
                return done(null,false, ['password do not match']);
            const checkUser = await db.users.findOne({
                where:{
                    email:email
                },raw:1})
            if(checkUser){
                return done(null,false,['user already exists']);
            }
            const hashPassword = await bcrypt.hash(password,10);
            const newUser = await db.users.create({email:email,hashedPassword:hashPassword});
            return done(null,newUser);
        }catch (e) {
            console.log(e)
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
                return done(null,false,{msg:"incorrect email"});
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

passport.use(
    'google',
    new googleStrategy({
        clientID: process.env.GOOGLE_CLIENT_id,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://www.example.com/oauth2/redirect/google",
        session:false
    },async function(issuer,profile,cb){
        try{
            const ExUser = await db.users.findOne({where:{profileId: profile.id}});
            if(!ExUser){
                const fullName = profile.displayName.split(' ');
                const newUser = await db.users.create({
                    firstName:fullName[0],
                    secondName:fullName[1],
                    provider:issuer,
                    email: profile.id,
                    googleId: profile.id,
                });//creating user if ExUser does not exist
                console.log(newUser)
                return cb(null,newUser);
            }else{  //else we already got a user, so we login
                const userInDb = await db.users.findOne({where:{googleId:profile.id}});
                return cb(null,userInDb);
            }
        }catch (e) {
            return cb(null,false,{msg:e});
        }
    })
);


module.exports = passport;

