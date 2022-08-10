const ApiError = require('../errorHandler/errors');
const {validationResult} = require('express-validator');
const authService = require('../service/authService');
const passport = require('../configs/passport');
const db = require('../../database/mySqlModels');

const userDto = require('../dtos/userDtos');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);



class authController{
    async register(req,res,next){
        try {
            var errors = validationResult(req);
            console.log(errors.isEmpty())
            if(!errors.isEmpty()){
                return res.status(400).json(errors)
            }
            passport.authenticate('register',async(err,user,info)=>{
                if(err){
                    return res.status(400).json("error during registration occured")
                }   
                if(info!== undefined){
                    res.status(400).json([{msg:info}])
                }else{
                    req.logIn(user,async(error)=>{
                        const {firstName, secondName,email, password,repeat_password} = req.body;
                        console.log('lox')

                        await user.update({
                            firstName:firstName,
                            secondName:secondName,
                            email:email
                        })
                        const tokens = await authService.createTokens(user);
                        res.cookie('accessToken', tokens.accessToken, {httpOnly:true, maxAge: 30*60*1000});
                        res.cookie('refreshToken', tokens.refreshToken, {httpOnly:true, maxAge: 30*24*60*60*1000});
                        return res.json({user: user , tokens:{...tokens}}).status(200);
                    })
                }
            })(req,res,next);
        }catch (e) {
            return next(e);
        }
    };
    async login(req,res,next){
        try{
            passport.authenticate('login', async(err,user,info)=>{
                if(err){
                    return res.status(400).json(err);
                }
                if(info !== undefined){
                    return res.status(400).json(info);
                }else{
                    req.logIn(user, async(err)=>{
                        if(err){
                            console.log(err)
                        }
                        const newTokens = await authService.refreshTokens(user);
                        res.cookie('accessToken', newTokens.accessToken, {httpOnly:true, maxAge: 30*60*1000});
                        res.cookie('refreshToken', newTokens.refreshToken, {httpOnly:true, maxAge: 30*24*60*60*1000});
                        return res.status(200).json({user:{user}, tokens:{...newTokens}});
                    })
                }
            })(req,res,next)
        }catch (e){
            return next(e);
        }
    };




    async auth2(req,res,next){
        const {tokenId} = req.body;
        const ticket = await client.verifyIdToken({
            idToken:tokenId,
            audience:process.env.GOOGLE_CLIENT_ID
        });
        const {email, picture, given_name, family_name,sub } = ticket.getPayload();
        const exUser = await db.users.findOne({where:{email:email}});
        if(exUser){
            //then we login
            const newTokens =await authService.refreshTokens(exUser);
            res.cookie('accessToken', newTokens.accessToken, {httpOnly:true, maxAge: 30*60*1000});
            res.cookie('refreshToken', newTokens.refreshToken, {httpOnly:true, maxAge: 30*24*60*60*1000});
            return res.status(200).json({user:{...exUser}, tokens:{...newTokens}});
        }else {
            const newUser = await db.users.create({
                firstName: given_name,
                secondName: family_name,
                email: email,
                avatar: picture,
                googleId: sub
            })
            const newTokens = await authService.refreshTokens(newUser);
            res.cookie('accessToken', newTokens.accessToken, {httpOnly:true, maxAge: 30*60*1000});
            res.cookie('refreshToken', newTokens.refreshToken, {httpOnly:true, maxAge: 30*24*60*60*1000});
            return res.status(200).json({user:{newUser}, tokens:{...newTokens}});
        }
    }





    async googleOauth(req,res,next){
        passport.authenticate('google', async(err,info,user)=>{
          if(err){
              return res.status(400).json({msg:err});
          }
          if(info!==undefined){
              return res.status(400).json({msg:info.msg})
          }else{
              req.logIn(user, error=>{
                  if(error){
                      return res.status(400).json({msg:error})
                  }
                  const newTokens = authService.refreshTokens(user);
                  res.cookie('accessToken', newTokens.accessToken, {httpOnly:true, maxAge: 30*60*1000});
                  res.cookie('refreshToken', newTokens.refreshToken, {httpOnly:true, maxAge: 30*24*60*60*1000});
                  console.log(user)
                  return res.status(200).json({user:{user}, tokens:{...newTokens}});
              })
          }
        })
    }
}


module.exports = new authController();