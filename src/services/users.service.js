const db = require('../db/mongo/mongo.lib');
const User = require('../db/mongo/models/users.model');

class Users {
    constructor() {
        this.model = User;
        this.db = new db();
    }

    async getAll(query) {
        try {
            const data = await this.db.getAll(this.model, query);
            return data;
        } catch(err) {
            console.log(err);
        }
    }

    async getOne(id) {
        try {
            const data = await this.db.getOne(this.model, id);
            return data;
        } catch(err) {
            console.log(err);
        }
    }

    async create(post) {
        try {
            const data = await this.db.create(this.model, post);
            return data;
        } catch(err) {
            console.log(err);
        }
    }

    async update(id, changes) {
        try {
            const data = await this.db.update(this.model, id, changes);
            return data;
        } catch(err) {
            console.log(err);
        }
    }

    async remove(id) {
        try {
            const data = await this.db.remove(this.model, id);
            return data;
        } catch(err) {
            console.log(err);
        }
    }
}

module.exports = Users;