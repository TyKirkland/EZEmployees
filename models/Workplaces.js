const {mongoose} = require('../config/connection');

const Schema = mongoose.Schema;

const workplaceSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
    // need to link each workplace to the user
    // need to add days open option?
})

const Workplaces = mongoose.model('workplaces', workplaceSchema);

module.exports = Workplaces;