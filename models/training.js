module.exports = (sequelize, DataTypes) => {
    const Training = sequelize.define('training', {
        title: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        time: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        hours: {
            type: DataTypes.TEXT,
            allowNull: true
        }


       
    });

    return Training;
}