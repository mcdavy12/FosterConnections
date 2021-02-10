const Sequelize= require('sequelize');
const user = require('./models/user');

const database = new Sequelize(process.env.DATABASE_URL, {
dialect: 'postgres'
});

database.authenticate()
    .then(() => console.log('postgres db is connected'))
    .catch(err=> console.log(err));

    const User = database.import ('./models/user')
    const WallPost = database.import('./models/wallPost')
    const reply = database.import('./models/reply')
    const Training = database.import('./models/training')

    User.hasMany(WallPost)
    WallPost.belongsTo(User)

    WallPost.hasMany(reply)
    reply.belongsTo(WallPost)

    User.hasMany(reply)
    reply.belongsTo(User)

    User.hasMany(Training)
    Training.belongsTo(User)

    Training.belongsToMany(User, {through: "signup"})
    User.belongsToMany(Training, {through: "signup"})

    module.exports = database;
