const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    content: String,
    privacy: String,
    location: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;