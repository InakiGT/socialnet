const client = require('./redis.client');

class Cache {
    async insert(collection, value) {
        await client.connect();

        const key = `${collection}_${value._id}`;
        const data = JSON.stringify(value);
        
        await client.hSet(collection, key, data, (err) => {
            if(err) throw err;
            client.expire(`${collection}:${key}`, 20);
        });

        return true;
    }

    async getAll(collection) {
        await client.connect();

        const data = await client.hGetAll(collection, (err, reply) => {
            if(err) throw err;
            return JSON.parse(reply);
        });
        
        return data;
    }

    async getOne(collection, id) {
        await client.connect();

        const data = await client.hGet(collection, id, (err, reply) => {
            if(err) throw err;
            return reply;
        });

        return data;
    }
}

module.exports = Cache;