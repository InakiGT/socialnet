const express = require('express');

const routerApi = require('./routes');
const { boomErrorHandler, errorHandler } = require('./middlewares/error.handler');

const createApp = async () => {
    const app = await express();

    app.use(express.json());
    routerApi(app);

    app.use(boomErrorHandler);
    app.use(errorHandler);
    return app;
}

module.exports = createApp;