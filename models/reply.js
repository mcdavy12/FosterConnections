module.exports = (sequelize, DataTypes) => {
    const Reply = sequelize.define('reply', {
        responseNarrative: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        
        
       
    });

    return Reply;
}