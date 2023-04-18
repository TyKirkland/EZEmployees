const {mongoose} = require('../config/connection');

const Schema = mongoose.Schema;

const shiftSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    }
})