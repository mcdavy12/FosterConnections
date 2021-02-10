const router = require('express').Router();
const User = require('../db').import('../models/user');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const Reply = require('../db').import('../models/reply');



//View replies by wallpost
router.get('/reply/:wallpostId', function (req, res) {
  
  // let wallpostId =  req.body.wallpost.wallpostId ;
  
  Reply.findAll({
      where: { wallpostId: req.params.wallpostId }
  })
      .then(wallpost => res.status(200).json(wallpost))
      .catch(err => resstatus(500).json({ error: err }))
});

const validateSession = require('../middleware/validateSession');

///////////create reply entry /////////////////////

router.post('/', validateSession, (req, res) => {
    const replyEntry = {
            responseNarrative: req.body.reply.responseNarrative,
            userId: req.user.id,
            wallpostId: req.body.reply.wallpostId

    }
    Reply.create(replyEntry)
        .then(reply => res.status(200).json(reply))
        .catch(err => res.status(500).json({ error: err }))
        
});



//////////update/////////////////

router.put('/update/:id', validateSession, (req, res) => {
    const updatereplyEntry ={
      title: req.body.reply.title,
      entry: req.body.reply.entry,
      likes: req.body.reply.likes,
      userId: req.user.id,
      wallpostId: req.body.reply.wallpostId
    }
    
    const query = {where: {id: req.params.id}};

    Reply.update(updatereplyEntry, query)
    
    
    .then(result => res.status(200).json(result))
    .catch(err => res.status(500).json({ error: err }))
  });


//////////delete//////////////

router.delete('/delete/:id', validateSession, function (req, res)  {
    const query = {where: { id: req.params.id}};

    Reply.destroy(query)
      .then(() => res.status(200).json({message: "Reply entry removed"}))
      .catch((err) => res.status(500).json({error: err}));
  
});
  
  
  
  //   try {
  //     const result = await answerEntry.destroy({
  //       where: { id: req.params.id }
  //     });
  
  //     res.status(200).json(result);
  //   } catch (err) {
  //     res.status(500).json({error: err});
  //   }
  // })

module.exports = router;