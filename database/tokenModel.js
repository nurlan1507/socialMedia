module.exports = (sequelize , DataTypes)=>{
    const tokenModel = sequelize.define("tokens", {
        refreshToken:{
            type: DataTypes.CHAR,
            unique:true,
            allowNull:false
        }
    });
    return tokenModel;
}