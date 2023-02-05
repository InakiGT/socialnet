const { Strategy, ExtractJwt } = require('passport-jwt');

const { config } = require('../../../config/config');

const JwtStrategy = new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSectret,
}, (payload, done) => {
    return done(null, payload);
});

module.exports = JwtStrategy;