const db = require('../db/mongo/mongo.lib');

class Posts {
    constructor() {
        this.collection = 'posts';
        this.db = new db();
    }

    async getAll(query) {
        try {
            const data = await this.db.getAll(this.collection, query);
            return data;
        } catch(err) {
            console.log(err);
        }
    }

    async getOne(id) {
        try {
            const data = await this.db.getOne(this.collection, id);
            return data;
        } catch(err) {
            console.log(err);
        }
    }

    async create(post) {
        try {
            const data = await this.db.create(this.collection, post);
            return data;
        } catch(err) {
            console.log(err);
        }
    }

    async update(id, changes) {
        try {
            const data = await this.db.update(this.collection, id, changes);
            return data;
        } catch(err) {
            console.log(err);
        }
    }

    async remove(id) {
        try {
            const data = await this.db.remove(this.collection, id);
            return data;
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = Posts;