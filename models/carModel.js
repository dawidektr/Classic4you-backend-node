
module.exports = (sequelize, DataTypes) => {

    const Car = sequelize.define("car", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        links: {
            type: DataTypes.STRING,
            allowNull: false
        },
        position:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },
    {
        timestamps: false,
        }
   );


    return Car;

};