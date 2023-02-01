const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
const boom = require('@hapi/boom');

const Users = require('./users.service');
const { config } = require('../config/config');

class Auth {
    constructor() {
        this.service = new Users();
    }

    async getUser(username, password) {
        try {
            const user = await this.service.getOneByUsername(username);
            const isMatch = bcrypt.compare(user.password, password);
            if(!isMatch) {
                throw boom.unauthorized();
            }

            return user;
        } catch(err) {
            console.log(err);
        }
    }

    async signToken(user) {
        try {
            const payload = {
                sub: user._id
            }
            
            const token = await jwt.sign(payload, config.jwtSectret);
            return {
                token,
                username: user.username,
            };
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = Auth;