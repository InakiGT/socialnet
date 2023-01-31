const Joi = require('joi');

const id = Joi.string();
const name = Joi.string();
const username = Joi.string();
const biography = Joi.string();
const website = Joi.string();
const birthday = Joi.date();
const photo = Joi.string();
const background = Joi.string();

const createUserDto = Joi.object({
    name: name.required(),
    username: username.required(),
    birthday: birthday.required(),
    biography,
    website,
    photo,
    background,
});

const updateUserDto = Joi.object({
    name,
    username,
    birthday,
    biography,
    website,
    photo,
    background,
});

const getDeleteUserDto = Joi.object({
    id: id.required(),
});

module.exports = {
    createUserDto,
    updateUserDto,
    getDeleteUserDto,
}