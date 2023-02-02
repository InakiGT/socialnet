const { GraphQLLocalStrategy } = require('graphql-passport');

const Auth = require('../../../services/auth.service');

const service = new Auth();

const GQLLocalStrategy = new GraphQLLocalStrategy(async ( username, password, done ) => {
    try {
        const user = await service.getUser(username, password);
        done(null, user);
    } catch(err) {
        done(err, false);
    }
});

module.exports = GQLLocalStrategy;