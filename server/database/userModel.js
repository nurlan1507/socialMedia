module.exports = (sequelize, DataTypes)=>{
    const user = sequelize.define('users',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull: false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
        },
        hashedPassword:{
            type:DataTypes.STRING(64),
        },
        username:{
            type:DataTypes.STRING,
        },
    });
    return user;
}