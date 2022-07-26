module.exports = (sequelize , DataTypes)=>{
    const Role = sequelize.define('userRoles',{
        value:{
            type:DataTypes.CHAR,
            default:"USER",
            unique:true,
        }
    });
    return Role;
}