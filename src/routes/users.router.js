const express = require('express');

const Users = require('../services/users.service');
const { validate } = require('../middlewares/validator.handler');
const { getDeleteUserDto, createUserDto, updateUserDto } = require('../dtos/user.dto');

const router = express.Router();
const service = new Users();

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
    validate(getDeleteUserDto, 'params'),
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
    validate(createUserDto, 'body'),
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
    validate(updateUserDto, 'body'),
    async(req, res, next) => {
        try {
            const { body } = req;
            const { id } = req.params;
            const data = await service.update(id, body);

            res
                .status(201)
                .json(data);
        } catch(err) {
            next(err);
        }
});

router.delete('/:id',
    validate(getDeleteUserDto, 'params'),
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
    }    
);

module.exports = router;