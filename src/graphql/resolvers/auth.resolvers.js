const Auth = require('../../services/auth.service');

const service = new Auth();

const login = async (_, { dto }, context) => {
    const { user } = await context.authenticate('graphql-local', { ...dto });
    return await service.signToken(user);
}

module.exports = {
    login,
}
