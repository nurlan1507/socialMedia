module.exports = (sequelize , DataTypes)=>{
    const tokenModel = sequelize.define("tokens", {
        refreshToken:{
            type: DataTypes.TEXT,
            allowNull:false
        },
    });
    return tokenModel;
}