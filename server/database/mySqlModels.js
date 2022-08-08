const {Sequelize , DataTypes} = require('sequelize');

const sequelize = new Sequelize('chatApp', 'root', 'Baitasnur1507',{
    host:"localhost",
    dialect:"mysql",
},{
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
});

sequelize.authenticate().then(()=>{
    console.log("MYSQL connected successfully");
}).catch(err=>{
    console.log("Could not connect mySQL, " + err);
});
const db ={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Tables
db.users = require('./userModel')(sequelize, DataTypes);
db.tokens = require('./tokenModel')(sequelize,DataTypes);
db.roles = require('./roles')(sequelize,DataTypes);

db.users.hasOne(db.tokens,{
    foreignKey:"userId",
});
db.tokens.belongsTo(db.users);

db.sequelize.sync({force:false}).then(()=>{
    console.log('all models are re-synced')
});


module.exports = db;