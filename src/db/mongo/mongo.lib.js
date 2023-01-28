const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../../config/config');

const DB_NAME = config.dbName;
const MONGO_URI = config.dbUrl;

class Mongo {
    constructor() {
        this.client = new MongoClient(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        this.dbName = DB_NAME;
    }

    async connect() {
        if(!Mongo.connection) {
            await this.client.connect();
            Mongo.connection = this.client.db(this.dbName);
            return Mongo.connection;
        }
        return Mongo.connection;
    }

    async getAll(collection, query) {
        const db = await this.connect();
        return db.collection(collection).find(query).toArray();
    }

    async getOne(collection, id) {
        const db = await this.connect();
        const filter = ObjectId(id);
        return db.collection(collection).findOne(filter);
    }

    async create(collection, data) {
        const db = await this.connect();
        return db.collection(collection).insertOne(data);
    }

    async update(collection, id, changes) {
        const db = await this.connect();
        const filter = ObjectId(id);
        return db.collection(collection).updateOne( { _id: filter }, { $set: changes });
    }

    async remove(collection, id) {
        const db = await this.connect();
        const filter = ObjectId(id);
        await db.collection(collection).deleteOne({ _id: filter });

        return id;
    }
}

module.exports = Mongo;