const mongoose = require('mongoose');
const { Schema } = mongoose;
const tagSchema = require('./tag.js')

module.exports = new Schema({
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
        required:  true
    },
    time: {
        type: Number,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    tags: 
        [tagSchema]
})