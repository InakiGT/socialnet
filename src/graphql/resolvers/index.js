const { post, posts, addPost, updatePost, removePost} = require('./posts.resolvers');

module.exports = {
    Query: {
        post,
        posts,
    },
    Mutation: {
        addPost,
        updatePost,
        removePost,
    },
}