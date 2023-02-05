const redis = require('redis');

const { config } = require('../config/config');

const client = redis.createClient({
    socket: {
        host: config.redisHost,
        port: config.redisPort,
    },
    password: config.redisPassword,
});

client.on('error', (err) => {
    console.log(err);
});

module.exports = client;