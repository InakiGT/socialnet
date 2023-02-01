const express = require('express');
const passport = require('passport');

const Auth = require('../services/auth.service');
const { validate } = require('../middlewares/validator.handler');
const { LoginDto } = require('../dtos/auth.dto');

const router = express.Router();
const service = new Auth();

router.post('/login',
    validate(LoginDto, 'body'),
    passport.authenticate('local', { session: false }),
    async(req, res, next) => {
        try {
            const { user } = req;
            const data = await service.signToken(user);

            res
                .status(200)
                .json(data);
        } catch(err) {
            next(err);
        }
});

module.exports = router;