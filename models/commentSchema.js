const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    blogID: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
})

const Comment = mongoose.model('comments', commentSchema);
module.exports = Comment