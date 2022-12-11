const express = require('express');
const router = express.Router();
const Pose = require('../models/pose');
const passport = require('passport');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Purpose: Fetch all poses from DB and return
    console.log('=====> Inside GET /poses');

    Pose.find({})
    .then(foundPoses => {
        res.json({ pose: foundPoses });
    })
    .catch(err => {
        console.log('Error in pose#index:', err);
        res.json({ message: 'Error occured... Please try again.'})
    });
});

router.get('/:id', (req, res) => {
    // Purpose: Fetch one pose from DB and return
    console.log('=====> Inside GET /poses/:id');

    Pose.findById(req.params.id)
    .then(pose => {
        res.json({ pose: pose });
    })
    .catch(err => {
        console.log('Error in pose#show:', err);
        res.json({ message: 'Error occured... Please try again.'})
    });
});