module.exports = (sequelize, DataTypes)=>{
    const user = sequelize.define('users',{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey:true,
            allowNull: false,
        },
        firstName:{
            type:DataTypes.STRING
        },
        secondName: {
            type:DataTypes.STRING
        },
        provider:{
            type:DataTypes.STRING,
            allowNull:true
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
            set(value){
                this.setDataValue('email', value)
            }
        },
        avatar:{
            type:DataTypes.STRING,
            defaultValue:  'https://res.cloudinary.com/dsnvwwozm/image/upload/v1657545948/zcejlqfembcowdritngr.jpg'
        },
        hashedPassword:{
            type:DataTypes.STRING(64),
        },

    });
    return user;
}