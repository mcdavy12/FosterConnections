const router = require('express').Router();
// const User = require('../db').import('../models/user');
const Training = require('../db').import('../models/training');



//GET ALL TRAININGS

router.get('/all', (req, res) => {
    Training.findAll()
    .then(training => res.status(200).json(training))
    .catch(err => res.status(500).json({ error: err}))
});

const validateSession = require('../middleware/validateSession');


// CREATE TRAINING

router.post('/', validateSession, (req, res) => {
    
    const trainingEntry = {
        title: req.body.training.title,
        time: req.body.training.time,
        description: req.body.training.description,
        hours: req.body.training.hours,
        owner: req.user.id,
        userId: req.user.id
    }
    Training.create(trainingEntry)
    .then(training => res.status(200).json(training))
    .catch(err => res.status(500).json({error: err}))
});

// EDIT TRAINING

router.put('/update/:id', validateSession, function (req, res) {

    console.log(req.user);

    const query = {where: {id: req.params.id, owner: req.user.id} };

    const updatetrainingEntry = {
        title: req.body.training.title,
        time: req.body.training.time,
        description: req.body.training.description,
        hours: req.body.training.hours,
    };

    Training.update(updatetrainingEntry, query)
    .then(trainings => res.status(200).json({message: 'training successfully updated'}))
    .catch((err) => res.status(500).json({error: err}));
});

// DELETE TRAINING

router.delete("/delete/:id", validateSession, function (req, res) {
    
    const query = { where: { id: req.params.id} };

    Training.destroy(query)
        .then(() => res.status(200).json({ message: "Training Entry Removed" }))
        .catch((err) => res.status(500).json({ error: err }));
});


// GET TRAINING BY USER

router.get("/mytrainings", validateSession, (req, res) => {
    let userid = req.user.id
    Question.findAll({
        where: { owner: userid }
    })
    .then(trainings => res.status(200).json(trainings))
    .catch(err => res.status(500).json({ error: err}))
});

module.exports = router;