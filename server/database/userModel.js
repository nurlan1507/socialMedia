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
            set(value){
                this.setDataValue('email', value)
            }
        },
        hashedPassword:{
            type:DataTypes.STRING(64),
        },
        username:{
            type:DataTypes.STRING,
            set(value){
                this.setDataValue('username', value)
            }
        },
    });
    return user;
}