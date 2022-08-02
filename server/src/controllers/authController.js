const ApiError = require('../errorHandler/errors');
const {validationResult} = require('express-validator');
const authService = require('../service/authService');
const passport = require('../configs/passport');
const db = require('../../database/mySqlModels');


class authController{
    async register(req,res,next){
        try {
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
                    return res.status(403).json({msg:'tilox'});
                }
                if(info !== undefined){

                    return res.status(403).json({msg:"tilox"});
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
    }
}


module.exports = new authController();