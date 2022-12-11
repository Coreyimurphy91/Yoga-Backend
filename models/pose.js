const mongoose = require('mongoose');
const { Schema } = mongoose;
const tagSchema = require('./tag.js')

const poseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: Number,
        required:  true,
        min: 1,
        max: 5
    },
    time: {
        type: Number,
        required: true,
        min: 1,
        default: 15
    },
    imageURL: {
        type: String,
        required: true
    },
    tags: 
        [tagSchema]
})

const Pose = mongoose.model('Pose', poseSchema);

module.exports = Pose;