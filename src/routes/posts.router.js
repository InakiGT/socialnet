const express = require('express');

const Posts = require('../services/posts.service');

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

router.get('/:id', async (req, res, next) => {
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

router.post('/', async (req, res, next) => {
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

router.put('/:id', async (req, res, next) => {
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

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

        const data = await service.remove(id);
        res
            .status(201)
            .json(data);
    } catch(err) {
        next(err);
    }
})

module.exports = router;