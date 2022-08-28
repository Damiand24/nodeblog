const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    views : {
        type: Number,
        default: 0
    },
    author: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Blog = mongoose.model('blogs', blogSchema);
module.exports = Blog;