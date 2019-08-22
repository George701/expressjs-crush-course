const express = require('express');
const members = require('../../Members');
const router = express.Router();
const uuid = require('uuid');

// get all members
router.get('/', (req, res) => res.json(members));

// get single member
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else{
        res.status(400).json({msg: `Member ${req.params.id} is not found` })
    }
    
});

// create member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email) res.status(400).json({msg: 'Please include a name and email'})

    members.push(newMember);
    res.json(members);
    // res.redirect('/');
});

// update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        const updMemebr = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updMemebr.name ? updMemebr.name : member.name;
                member.email = updMemebr.email ? updMemebr.email : member.email;

                res.json({msg: 'Member updated', member});
            }
        });
    }else{
        res.status(400).json({msg: `Member ${req.params.id} is not found` })
    }
    
});

// delete single member
router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id))

    if(found){

        res.json({mesg: 'Member is deleted', member: members.filter(member => member.id === parseInt(req.params.id))});
    }else{
        res.status(400).json({msg: `Member ${req.params.id} is not found` })
    }
    
});

module.exports = router;