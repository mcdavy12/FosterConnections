const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');


module.exports = async (req, res, next) => {
    const token = req.headers.authorization; //Postman --headers (key)Authorization

    console.log('token ----> ', token)
    if (!token) {
        return res.status(403).send({ auth: false, message: "No token provided" }) //403 Forbidden Error
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
            // console.log('decode token ---->', decodeToken)
            if (!err && decodeToken) {
                User
                    .findOne({
                        where: {
                            id: decodeToken.id
                        }
                    })
                    .then(user => {

                        if (!user) throw err;
                        // console.log('request body ---->', req)
                        req.user = user;
                        // console.log('user ----->', user)
                        // console.log('next --->', next)
                        return next();
                    })
                    .catch(err => next(err)); // pass an error into the next() function
            } else {
                req.errors = err;
                return res.status(500).send('Not authorized!!!'); //should return null by default, return err from the if statement with (!err && decodeToken.id )
            }
        });
    }
}