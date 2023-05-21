const dbConfig = require('../config/dbConfig.js');
const { Sequelize, DataTypes,QueryTypes } = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('connected..');
    })
    .catch(err => {
        console.log('Error' + err);
    });

 


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.car = require('./carModel.js')(sequelize, DataTypes);
db.photo = require('./photoModel.js')(sequelize,DataTypes);

db.car.hasMany(db.photo,
    {
        onDelete:'CASCADE',
        onUpdate:'CASCADE'
    });

db.photo.belongsTo(db.car,{
    foreignKey:"carId",
    onDelete:'CASCADE',
    onUpdate:'CASCADE'
});

    

db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!');
    });



module.exports = db;
