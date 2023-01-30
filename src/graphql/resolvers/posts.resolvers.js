const Posts = require('../../services/posts.service');

const service = new Posts();

const post = (_, { id }) => {
    return service.getOne(id);
}

const posts = () => {
    return service.getAll({});
}

const addPost = (_, { dto }) => {
    return service.create(dto);
}

const updatePost = async (_, { id, dto }) => {
    const response = await service.update(id, dto);
    console.log(response)
    return response
}

const removePost = (_, { id }) => {
    return service.remove(id);
}

module.exports = {
    post,
    posts,
    addPost,
    updatePost,
    removePost,
}
