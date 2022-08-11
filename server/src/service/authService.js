const db = require('../../database/mySqlModels');
const bcrypt = require('bcrypt');
const userDTO= require('../dtos/userDtos');
const ApiError = require('../errorHandler/errors');
const {Op} = require('sequelize');
const jwt = require('jsonwebtoken');



const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


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
        const userDto = new userDTO(user.id, user.firstName, user.secondName,user.email , user.avatar);
        console.log(userDto.toString());
        const refreshToken = await jwt.sign({...userDto}, process.env.REFRESHTOKENSECRET, {expiresIn:'7d'});
        const accessToken = await jwt.sign({...userDto}, process.env.ACCESSTOKENSECRET,{expiresIn: '30m'});

        // const [tokenIdDb, created] = await db.tokens.upsert({
        //     userId:user.id,
        //     refreshToken: refreshToken
        // });
        // if(!created){
        //     var newToken = await db.tokens.create({refreshToken:refreshToken, userId:user.id});
        //     return {refreshToken: refreshToken, accessToken:accessToken};
        // }
        const tokenInDb = db.tokens.findOne({where:{userId:user.id}})
            .then((tokenInDb)=>{
                if(!tokenInDb){
                    db.tokens.create({refreshToken:refreshToken, userId:user.id});
                    return
                }
                tokenInDb.update({
                    refreshToken:refreshToken,
                });
                return
            })
        return {refreshToken: refreshToken, accessToken:accessToken};
    }


    async getGoogleUserCredentials(tokenId){
        const ticket = await client.verifyIdToken({
            idToken:tokenId,
            audience:process.env.GOOGLE_CLIENT_ID
        });
        const {email, picture, given_name, family_name,sub } = ticket.getPayload();
        return {email:email,picture:picture,given_name:given_name, family_name:family_name, sub:sub}
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