const {mongoose} = require('../config/connection');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please make sure to enter an email"],
        unique: true
    },
    username: {
        type: String,
        required: [true, "Please enter a username"],
        unique: [true, "That username already exists"]
    },
    password: {
        type: String,
        required: [true, "You have to enter a password"]
    }
}, {timestamps: true})

const Users = mongoose.model('user', userSchema);

module.exports = Users;