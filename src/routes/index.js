const express = require('express');

const postsRouter = require('./posts.router');
const usersRouter = require('./users.router');
const authRouter = require('./auth.router');

const routerApi = (app) => {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/posts', postsRouter);
    router.use('/users', usersRouter);
    router.use('/auth', authRouter);
}

module.exports = routerApi;