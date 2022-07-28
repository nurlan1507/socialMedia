module.exports = (sequelize , DataTypes)=>{
    const tokenModel = sequelize.define("tokens", {
        refreshToken:{
            type: DataTypes.CHAR,
            allowNull:false
        }
    });
    return tokenModel;
}