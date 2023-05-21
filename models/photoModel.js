
module.exports = (sequelize, DataTypes) => {

    const Photo = sequelize.define("photo", {
        path: {
            type: DataTypes.STRING,
            allowNull: false
        },
        main: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        position:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
        },
        {
        timestamps: false,
        });

    return Photo;

};