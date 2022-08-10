const db = require('../../database/mySqlModels');
const bcrypt = require('bcrypt');
const userDTO= require('../dtos/userDtos');
const ApiError = require('../errorHandler/errors');
const {Op} = require('sequelize');
const jwt = require('jsonwebtoken');

class authService{

    async createTokens(user){
        const userdto = new userDTO(user.id, user.firstName, user.secondName, user.email, user.avatar);
        const refreshToken = await jwt.sign({...userdto}, process.env.REFRESHTOKENSECRET, {expiresIn:'7d'});
        const accessToken = await jwt.sign({...userdto}, process.env.ACCESSTOKENSECRET,{expiresIn: '30m'});
        const DBToken = await db.tokens.create({
            refreshToken:refreshToken,
            userId:user.id
        })
        return {refreshToken:refreshToken, accessToken:accessToken}
    }



    async refreshTokens(user){
        const userDto = new userDTO(user.username, user.email);
        const refreshToken = await jwt.sign({...userDto}, process.env.REFRESHTOKENSECRET, {expiresIn:'7d'});
        const accessToken = await jwt.sign({...userDto}, process.env.ACCESSTOKENSECRET,{expiresIn: '30m'});
        const newDbToken = await db.tokens.findOne({where:{userId:user.id}});
        if(!newDbToken){
            var newToken = await db.tokens.create({refreshToken:refreshToken, userId:user.id});
            return {refreshToken: refreshToken, accessToken:accessToken};
        }
        const newDBToken = await db.tokens.update({refreshToken:refreshToken}, {where:{
            userId:user.id
            }}
        )
        console.log(newDBToken);
        return {refreshToken: refreshToken, accessToken:accessToken};
    }


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