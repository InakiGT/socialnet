const { Strategy } = require('passport-local');

const Auth = require('../../../services/auth.service');

const service = new Auth();

const LocalStrategy = new Strategy({
        usernameField: 'username',
        passwordField: 'password',
    },
    async (username, password, done) => {
        try {
            const user = await service.getUser(username, password);
            done(null, user);
        } catch(err) {
            done(err, false);
        }
    }
);

module.exports = LocalStrategy;