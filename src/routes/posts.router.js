const express = require('express');

const Posts = require('../services/posts.service');
const { validate } = require('../middlewares/validator.handler');
const { getDeltePostDto, createPostDto, updatePostDto } = require('../dtos/post.dto');
const passport = require('passport');

const router = express.Router();
const service = new Posts();

router.get('/', async (_, res, next) => {
    try {
        const data = await service.getAll();
        res
            .status(200)
            .json(data);
    } catch(err) {
        next(err);
    }
});

router.get('/:id', 
    validate(getDeltePostDto, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = await service.getOne(id);
            res
                .status(200)
                .json(data);
        } catch(err) {
            next(err);
    }
});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    validate(createPostDto, 'body'),
    async (req, res, next) => {
        try {
            const { body } = req;
            const data = await service.create(body);
            res
                .status(201)
                .json(data);
        } catch(err) {
            next(err);
    }
});

router.put('/:id',
    passport.authenticate('jwt', { session: false }),
    validate(updatePostDto, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const { body } = req;

            const data = await service.update(id, body);
            res
                .status(201)
                .json(data);
        } catch(err) {
            next(err);
        }
});

router.delete('/:id', 
    passport.authenticate('jwt', { session: false }),
    validate(getDeltePostDto, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;

            const data = await service.remove(id);
            res
                .status(202)
                .json(data);
        } catch(err) {
            next(err);
    }
});

module.exports = router;