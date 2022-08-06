const ApiError = require('../errorHandler/errors');
const {validationResult} = require('express-validator');
const authService = require('../service/authService');
const passport = require('../configs/passport');
const db = require('../../database/mySqlModels');


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
                    return res.status(403).json({msg:err});
                }
                if(info !== undefined){
                    return res.status(403).json({msg:err});
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

    // async googleOauth(req,res,next){
    //     passport.authenticate('google', async(err,info,user)=>{
    //       if(err){
    //           return res.status(403).json({msg:err});
    //       }
    //       if(info!==undefined){
    //           return res.status(403).json({msg:info.msg})
    //       }else{
    //           req.logIn(user, error=>{
    //               if(error){
    //                   return res.status(403).json({msg:error})
    //               }
    //               console.log(user)
    //           })
    //       }
    //     })
    // }
}


module.exports = new authController();