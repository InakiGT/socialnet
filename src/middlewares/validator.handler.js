const boom = require("@hapi/boom");

class Validator {
    static validate(schema, property) {
        return (req, _, next) => {
            const data = req[property];
            const { error } = schema.validate(data, { abortEarly: false });
            if(error) {
                next(boom.badRequest(error));
            }
            next();
        }
    }
}

module.exports = Validator;