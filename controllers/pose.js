const express = require('express');
const router = express.Router();
const Pose = require('../models/pose');
const passport = require('passport');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Purpose: Fetch all poses from DB and return
    console.log('=====> Inside GET /poses');

    Pose.find({name: {$regex: parameter, $options: 'i'}}).limit(5)
    .then(foundPoses => {
        res.json({ pose: foundPoses });
    })
    .catch(err => {
        console.log('Error in pose#index:', err);
        res.json({ message: 'Error occured... Please try again.'})
    });
});