const mongoose = require('mongoose');
const { Schema } = mongoose;

const poseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    poses: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'pose'
    },
})

const Pose = mongoose.model('Pose', poseSchema);

module.exports = Pose;