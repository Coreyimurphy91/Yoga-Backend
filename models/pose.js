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
        max: 3
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
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag'
    }]
})

const Pose = mongoose.model('Pose', poseSchema);

module.exports = Pose;