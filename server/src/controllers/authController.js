const ApiError = require('../errorHandler/errors');
const {validationResult} = require('express-validator');
const authService = require('../service/authService');
class authController{
    async register(req,res,next){
        try {
            const errors = validationResult(req);
            console.log(errors)
            if(errors.length > 0){
               return res.json('lox')
            }
            const {email,password,username} = req.body;
            const newUser = await authService.register(email,password,username);
            console.log(newUser)
            res.cookie('accessToken', newUser.accessToken, {maxAge:60*1000*15, httpOnly:true});
            res.cookie('refreshToken', newUser.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.status(200).json(newUser);
        }catch (e) {
            return next(e);
        }
    };
    async login(req,res,next){
        try{
            const {email,password} = req.body;
            const result = await authService.login(email,password);
            return res.json(result).status(200);
        }catch (e){
            return next(e);
        }
    }
}


module.exports = new authController();