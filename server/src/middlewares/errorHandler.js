const ApiError = require('../errorHandler/errors');
module.exports = (err, req,res,next)=>{
    if(err instanceof ApiError){
        return res.status(err.status).json({msg:err.description ,errors:err.errors});
    }
    return res.status(500).json({msg:"unexpected Error"});
};