require('dotenv').config(); 
const Express  = require('express');
const app = Express();

const database= require('./db')
// database.sync({force: true}) //to clear all tables in database

database.sync()

app.use(Express.json()); // body of request of json file (brings in JSON parser for backend)
app.use(require('./middleware/headers'));
app.use(Express.static(__dirname + '/public'));

app.get('/', (request, response) => response.render('index'));

const usercontroller = require('./controllers/usercontroller');
app.use('/user', usercontroller)

const wallpostcontroller = require('./controllers/wallPostController')
app.use('/wallpost', wallpostcontroller)

const replycontroller = require('./controllers/replyController')
app.use('/reply', replycontroller)

const trainingcontroller = require('./controllers/trainingcontroller')
app.use('/training', trainingcontroller)

app.listen(process.env.PORT, () => console.log(`App is listening on ${process.env.PORT}`));