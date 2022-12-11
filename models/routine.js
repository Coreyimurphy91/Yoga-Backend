const mongoose = require('mongoose');
const { Schema } = mongoose;
const poseSchema = require('./pose.js')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    poses:[poseSchema]
})