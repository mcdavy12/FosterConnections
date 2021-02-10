module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        }
    });
    return User
};