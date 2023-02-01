const { config } = require('../../config/config');
const mongoose = require('mongoose');

const DB_NAME = config.dbName;
const MONGO_URI = config.dbUrl;

class Mongo {
    async connect() {
        mongoose.connect(MONGO_URI);
    }

    async getAll(model, query) {
        await this.connect();
        return await model.find(query);
    }

    async getOne(model, id) {
        await this.connect();
        return await model.find({_id: id});
    }

    async getOneByQuery(model, query) {
        await this.connect();
        return await model.find(query);
    }

    async create(model, data) {
        await this.connect();
        return await model.create(data);
    }

    async update(model, id, changes) {
        await this.connect();
        return await model.findOneAndUpdate( { _id: id }, changes);
    }

    async remove(model, id) {
        await this.connect();
        await model.deleteOne({ _id: id });

        return id;
    }
}

module.exports = Mongo;