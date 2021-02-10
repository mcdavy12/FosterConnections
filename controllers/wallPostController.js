const router = require('express').Router();
const WallPost = require('../db').import('../models/wallPost');



/* *********GET ALL WALLPOSTS********* */

 router.get("/", (req, res) => {
     WallPost.findAll()
     .then(wallPost => res.status(200).json(wallPost))
     .catch(err => res.status(500).json({ error: err}))
 });

const validateSession = require('../middleware/validateSession');



/* *************WALLPOST CREATE*************** */

router.post('/', validateSession, (req, res) => {
    
    const wallpostEntry = {
        category: req.body.wallpost.category,
        narrative: req.body.wallpost.narrative,
        owner: req.user.id,
        userId: req.user.id,
    }
    WallPost.create(wallpostEntry)
        .then(wallpost => res.status(200).json(wallpost))
        .catch(err => res.status(500).json({ error: err }))
});

/* ***************EDIT WALLPOST************** */

router.put("/update/:id", validateSession, function (req, res) {

    console.log(req.user); 

    const query = { where: { id: req.params.id, owner: req.user.id } };
    console.log('query---->', query);

    const updatewallPostEntry = {
        category: req.body.wallpost.category,
        narrative: req.body.wallpost.narrative,
    };
    
    

    WallPost.update(updatewallPostEntry, query)
        .then(questions => res.status(200).json({message: 'wallPost sucessfully edited'}))
        .catch((err) => res.status(500).json({ error: err }));
});


/* ***************DELETE WALLPOST************** */

router.delete("/delete/:id", validateSession, function (req, res) {
    
    const query = { where: { id: req.params.id} };

    WallPost.destroy(query)
        .then(() => res.status(200).json({ message: "WallPost Entry Removed" }))
        .catch((err) => res.status(500).json({ error: err }));
});

/* **************GET WALLPOST BY CATEGORY*************** */

router.get('/:category', function (req, res) {
    let category = req.params.category;

    wallPost.findAll({
        where: { category: category }
    })
        .then(wallpost => res.status(200).json(wallPost))
        .catch(err => resstatus(500).json({ error: err }))
});



module.exports = router;