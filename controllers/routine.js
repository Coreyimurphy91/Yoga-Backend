// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// DB Models
const Routine = require('../models/routine');
const Pose = require('../models/pose');

// Controllers
router.get('/test', (req, res) => {
    res.json({ message: 'User endpoint OK! ✅' });
});

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Purpose: Fetch all poses from DB and return
    console.log('=====> Inside GET /poses');

    Routine.find({})
        .then(foundRoutines => {
            res.json({ routine: foundRoutines });
        })
        .catch(err => {
            console.log('Error in routine#index:', err);
            res.json({ message: 'Error occured... Please try again.' })
        });
});

router.get('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    // Purpose: Fetch one routine from DB and return
    console.log('=====> Inside GET /routines/:id');
    Routine.findById(req.params.id)
        .then(routine => {
            res.json({ routine: routine });
        })
        .catch(err => {
            console.log('Error in pose#show:', err);
            res.json({ message: 'Error occured... Please try again.' })
        });
});

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { name } = req.body;
    Routine.create({
        user: req.user,
        name: name,
    })
        .then(routine => {
            console.log('New Routine >>>', routine);
            res.json({ message: 'success' });
        })
        .catch(error => {
            console.log('error', error)
            res.json({ message: "Error occurred, please try again" });
        });
});

router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {

    //put
    const { poseId, action } = req.body;
    const routine = await Routine.findById(req.params.id)
    if (action === 'add') {
        const pose = await Pose.findById(poseId);
        routine.poses.push(pose)
    } else {
        routine.poses = routine.poses.filter( pose => pose._id !== poseId)
    }
    routine.save();
    //put
    // Purpose: Update one example in the DB, and return
    console.log('=====> Inside PUT /examples/:id');
    console.log('=====> req.params', req.params); // object used for finding example by id
    console.log('=====> req.body', req.body); // object used for updating example

    // Example.findByIdAndUpdate(req.params.id, req.body, { new: true })
    //     .then(updatedExample => {
    //         console.log('Example updated', updatedExample);
    //         res.redirect(`/examples/${req.params.id}`);
    //     })
    //     .catch(err => {
    //         console.log('Error in example#update:', err);
    //         res.json({ message: 'Error occured... Please try again.' });
    //     });
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Purpose: Update one routine in the DB, and return
    console.log('=====> Inside DELETE /routines/:id');
    console.log('=====> req.params');
    console.log(req.params); // object used for finding routine by id
    
    Routine.findByIdAndRemove(req.params.id)
    .then(response => {
        console.log(`Routine ${req.params.id} was deleted`, response);
        res.redirect(`/routines`);
    })
    .catch(err => {
        console.log('Error in routine#delete:', err);
        res.json({ message: 'Error occured... Please try again.'});
    });
});

module.exports = router;
