const db = require('../../database/mySqlModels');
const bcrypt = require('bcrypt');
const userDTO= require('../dtos/userDtos');
const ApiError = require('../errorHandler/errors');
const {Op} = require('sequelize');
const jwt = require('jsonwebtoken');

class authService{
    async register(email,password,username){
        const userInDB = await db.users.findOne({where:{
            email:{[Op.eq]:email,}}}
        );
        if(userInDB){
            throw new ApiError('user already exists', 400);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser =  db.users.create({email:email,hashedPassword:hashedPassword, username:username});
        const userdto = new userDTO(email,username);
        console.log(userdto)
        //creating tokens
        const refreshToken = await jwt.sign(...userdto, process.env.REFRESHTOKENSECRET, {expiresIn:'7d'});
        const accessToken = await jwt.sign(...userdto, process.env.ACCESSTOKENSECRET,{expiresIn: '30m'});
        return {
            user:newUser,
            refreshToken:refreshToken,
            accessToken:accessToken,
        };
    };

}

module.exports = new authService();