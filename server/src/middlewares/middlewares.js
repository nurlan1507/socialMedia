const jwt = require('jsonwebtoken');
const ApiError = require('../../src/errorHandler/errors');

module.exports = (req,res,next)=>{
        try{
            const accessToken = req.headers.Authorization;
            jwt.verify(accessToken,process.env.ACCESSTOKENSECRET, (err,decoded)=>{
                if(err){
                    throw new ApiError('Your token has expired, Please sign in again',403)
                }
            });
            return next()
        }catch (e){
            return res.json(e.description).status(e.status);
        }
}
