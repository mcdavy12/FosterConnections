const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validatesession = require('../middleware/validateSession');

router.post('/signup', (req, res) => {

    User.create({
        email: req.body.user.email,
        password: bcrypt.hashSync(req.body.user.password, 13),
        firstName: req.body.user.firstName,
        lastName: req.body.user.lastName,
        phoneNumber: req.body.user.phoneNumber,
        admin: req.body.user.admin
    })
        .then(user => {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "14d" });
            res.status(200).json({
                user: user,
                message: "The fosterConnections user was created",
                sessionToken: token
            })
        })
        .catch(err => res.status(500).json({ error: err }));
})


router.post('/signin', (req, res) => {
    User.findOne({
        where: {
            email: req.body.user.email
        }
    })
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                    if (matches) {
                        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '14d' });

                        res.status(200).json({
                            user: user,
                            message: "fosterConnections user has been authenticated",
                            sessionToken: token
                        })

                    } else {
                        res.status(500).json({ error: "password mismatch" })
                    }
                })

            } else {
                res.status(500).json({ error: "user not found" })
            }
        })
        .catch(err => res.status(500).json({ error: "database error" }));
});


//GET ALL USERS
router.get('/', (req, res) => {
    User.findAll()
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500)({error: err}))

});

module.exports = router;