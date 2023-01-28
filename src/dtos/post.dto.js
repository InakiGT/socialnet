const Joi = require('Joi');

const id = Joi.string();
const privacy = Joi.string();
const location = Joi.string();
const content = Joi.string();

const createPostDto = Joi.object({
    privacy: privacy.required(),
    content: content.required(),
    location,
});

const updatePostDto = Joi.object({
    privacy,
    location,
    content,
});

const getDeltePostDto = Joi.object({
    id: id.required(),
});


module.exports = {
    createPostDto,
    updatePostDto,
    getDeltePostDto,
}