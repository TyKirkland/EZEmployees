const {mongoose} = require('../config/connection');

const Schema = mongoose.Schema;

const shiftSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    start: {
        type: String,
        required: true
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    workplace: {
        type: String
    }
})

const Shifts = mongoose.model('shifts', shiftSchema);

module.exports = Shifts;