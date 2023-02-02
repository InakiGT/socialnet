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
            const isMatch = await bcrypt.compare(password, user[0].password);
            if(!isMatch) {
                throw boom.unauthorized();
            }
            
            return user;
        } catch(err) {
            throw new Error(err);
        }
    }

    async signToken(user) {
        try {
            const payload = {
                sub: user[0]._id
            }
            
            const token = await jwt.sign(payload, config.jwtSectret);
            
            return {
                token,
                username: user[0].username,
            };
        } catch(err) {
            throw new Error(err);
        }
    }
}

module.exports = Auth;