const ApiError = require('../errorHandler/errors');
const {validationResult} = require('express-validator');
const authService = require('../service/authService');
class authController{
    async register(req,res,next){
        try {
            const errors = validationResult(req);
            if(errors.length >0){
                throw new ApiError('Validation not passed',400,errors);
            }
            const {email,password,username} = req.body;
            const newUser = await authService.register(email,password,username);
            return res.status(200).json(newUser);
        }catch (e) {
            return next(e);
        }
    }
}


module.exports = new authController();