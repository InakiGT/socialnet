const { post, posts, addPost, updatePost, removePost} = require('./posts.resolvers');
const { user, users, addUser, updateUser, removeUser } = require('./users.resolvers');

module.exports = {
    Query: {
        post,
        posts,
        user,
        users,
    },
    Mutation: {
        addPost,
        updatePost,
        removePost,
        addUser,
        updateUser,
        removeUser,
    },
}