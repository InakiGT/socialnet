const express = require('express');
const cors = require('cors');

const useGraphql = require('./graphql');
const routerApi = require('./routes');
const { boomErrorHandler, errorHandler } = require('./middlewares/error.handler');

const createApp = async () => {
    const app = express();

    app.use(express.json());
    // app.use(cors);
    routerApi(app);
    await useGraphql(app);

    require('./utils/auth');

    app.use(boomErrorHandler);
    app.use(errorHandler);

    return app;
}

module.exports = createApp;