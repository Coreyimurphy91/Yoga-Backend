const mongoose = require('mongoose');
const { Schema } = mongoose;

const routineSchema = new Schema({
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

const Routine = mongoose.model('Routine', routineSchema);

module.exports = Routine;