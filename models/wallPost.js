module.exports = (sequelize, DataTypes) => {
    const WallPost = sequelize.define('wallpost', {
        category: {
            type: DataTypes.STRING,
            allowNull: false,   
        },
        narrative: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
       
    });
    
    return WallPost
};