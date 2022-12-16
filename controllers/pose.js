// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { JWT_SECRET } = process.env;

// DB Models

const Pose = require('../models/pose');

// Controllers
router.get('/test', (req, res) => {
    res.json({ message: 'User endpoint OK! ✅' });
});

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Purpose: Fetch all poses from DB and return
    console.log('=====> Inside GET /poses');
    console.log(req.user);

    Pose.find({})
    .then(foundPoses => {
        res.json({ pose: foundPoses });
    })
    .catch(err => {
        console.log('Error in pose#index:', err);
        res.json({ message: 'Error occured... Please try again.'})
    });
});

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // Purpose: Fetch one pose from DB and return
    console.log('=====> Inside GET /poses/:id');
    console.log(req.user);

    Pose.findById(req.params.id)
    .then(pose => {
        res.json({ pose: pose });
    })
    .catch(err => {
        console.log('Error in pose#show:', err);
        res.json({ message: 'Error occured... Please try again.'})
    });
});

// Exports
module.exports = router;