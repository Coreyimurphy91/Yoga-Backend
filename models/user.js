const mongoose = require('mongoose');
const { Schema } = mongoose;
const routineSchema = require('./routine.js');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    selfDescription: {
        type: String,
        default: 'Yoga Flow Creater'
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    date: {
        type: Date,
        default: Date.now()
    },
    routines: [routineSchema]
})

const User = mongoose.model('User', userSchema);

module.exports = User;