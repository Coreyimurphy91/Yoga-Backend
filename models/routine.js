const mongoose = require('mongoose');
const { Schema } = mongoose;
const poseSchema = require('./pose.js')

const routineSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    poses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pose'
    }],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

})

const Routine = mongoose.model('Routine', routineSchema);

module.exports = Routine;