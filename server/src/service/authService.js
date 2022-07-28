const db = require('../../database/mySqlModels');
const bcrypt = require('bcrypt');
const userDTO= require('../dtos/userDtos');
const ApiError = require('../errorHandler/errors');
const {Op} = require('sequelize');
const jwt = require('jsonwebtoken');

class authService{
    async register(email,password,username){
        const userInDB = await db.users.findOne({where:{
            email:email}, raw:true
        });

        if(userInDB){
            throw new ApiError('user already exists', 400);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.users.create({
            email:email,
            hashedPassword:hashedPassword,
            username:username
        });

        const userdto = new userDTO(email,username);

        //creating tokens
        const refreshToken = await jwt.sign({...userdto}, process.env.REFRESHTOKENSECRET, {expiresIn:'7d'});
        const accessToken = await jwt.sign({...userdto}, process.env.ACCESSTOKENSECRET,{expiresIn: '30m'});
        const DBToken =await db.tokens.create({
            refreshToken:refreshToken,
            userId:user.id
        });

        return {
            user:user,
            refreshToken:refreshToken,
            accessToken:accessToken,
        };
    };

    async login(email,password) {
        if (!email || !password) {
            throw new ApiError('validation error', 400);
        }
        const user = await db.users.findOne({where: {email: email}});
        if (!user) {
            throw new ApiError('user does not exists', 404);
        }
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
        if (passwordMatch === false) {
            throw new ApiError('password not correct', 400);
        }
        const userDto = new userDTO(user.username , user.email);
        const refreshToken =  await jwt.sign({...userDto}, process.env.REFRESHTOKENSECRET, {expiresIn: '7d'});
        const accessToken =  await jwt.sign({...userDto}, process.env.ACCESSTOKENSECRET, {expiresIn: '30m'});

        await db.tokens.update({refreshToken:refreshToken},{where:{userId:user.id}});
        return {user:userDto ,refreshToken: refreshToken, accessToken:accessToken};

    }


}

module.exports = new authService();