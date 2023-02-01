const Joi = require('joi');

const username = Joi.string();
const password = Joi.string().min(8);

const LoginDto = Joi.object({
    username: username.required(),
    password: password.required(),
});

module.exports = {
    LoginDto,
}