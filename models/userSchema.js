const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    isSuspended: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean
    }
}, {timestamps: true}) 

const User = mongoose.model('users', userSchema);
module.exports = User;