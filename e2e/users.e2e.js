const request = require('supertest');
const { MongoClient } = require('mongodb');

const { config } = require('../src/config/config');
const createApp = require('../src/app');

const DB_NAME = 'test';
const MONGO_URI = config.dbUrl;
const COLLECTION = 'users';

describe('Test for Users', () => {
    let db;
    let app;
    let server;

    beforeAll(async() => {
        app = await createApp();
        server = app.listen(3002);

        const client = new MongoClient(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await client.connect();
        db = client.db(DB_NAME);
    });

    afterAll(async() => {
        await server.close();
        await db.command({ "drop": COLLECTION });
    });

    describe('Test for [GET]', () => {
        test('should return a list of users', async () => {
            const seedData = await db.collection(COLLECTION).insertMany([
                {
                    username: 'IñakiDev',
                    name: 'Iñaki',
                    birthday: new Date(),
                },
                {
                    username: 'FernandaPP',
                    name: 'Fernanda',
                    birthday: new Date(),
                },
            ]); 
            
            return request(app)
                .get('/api/v1/users')
                .expect(200)
                .then(({ body }) => {
                    expect(body.length).toEqual(seedData.insertedCount);
                });
        });

        test('should return one user', async() => {
            // Arrange
            const seedData = await db.collection(COLLECTION).insertOne({
                username: 'IñakiDev',
                name: 'Iñaki',
                birthday: new Date(),
            });

            const id = seedData.insertedId.toString();
            
            // Act
            return request(app)
                .get(`/api/v1/users/${id}`)
                .expect(200)
                .then(({ body }) => {
                    // Assert
                    expect(body[0]._id).toEqual(id);
                });
        });
    });

    describe('Test for [POST]', () => {
        test('should return a new user', async() => {
            // Arrange
            const data = {
                username: 'IñakiDev',
                name: 'Iñaki',
                birthday: new Date(),
            }

            // Act
            return request(app)
                .post('/api/v1/users')
                .set('Accept', 'application/json')
                .send(data)
                .expect(201)
                .then(({ body }) => {
                    // Assert
                    expect(body.username).toEqual(data.username);
                });
        });

        test('should return Bad request', async() => {
            // Arrange
            const data = { name: 'Miguel' };

            // Act
            return request(app)
                .post('/api/v1/users')
                .set('Accept', 'application/json')
                .send(data)
                .expect(400)
                .then((({ body }) => {
                    // Assert
                    expect(body.error).toEqual('Bad Request');
                }));
        });
    });

    describe('Test for [PUT]', () => {
        let seedData;
        let id;

        beforeAll(async () => {
            seedData = await db.collection(COLLECTION).insertOne({
                username: 'IñakiDev',
                name: 'Iñaki',
                birthday: new Date(),
            });
            id = seedData.insertedId.toString();
        });

        test('should return an updated user', () => {
            // Arrange
            // Act
            return request(app)
                .put(`/api/v1/users/${id}`)
                .set('Accept', 'application/json')
                .send({
                    username: 'Pedro',
                })
                .expect(201)
                .then(({ body }) => {
                    // Assert
                    expect(body._id).toEqual(id);
                });
        });

        test('should return Bad request', () => {
            // Arrange
            // Act
            return request(app)                .
            put(`/api/v1/users/${id}`)
            .set('Accept', 'application/json')
            .send({
                username: 12,
            })
            .expect(400)
            .then(({ body }) => {
                // Assert
                expect(body.error).toEqual('Bad Request');
            });
        });
    });

    describe('Test [DELETE]', () => {
        test('should return a user id', async() => {
            // Arrange
            const seedData = await db.collection(COLLECTION).insertOne({
                username: 'Pedro',
                name: 'Pedro',
                birthday: new Date(),
            });
            const id = seedData.insertedId.toString();

            // Act
            return request(app)
                .delete(`/api/v1/users/${id}`)
                .expect(202)
                .then(({ body }) => {
                    // Assert
                    expect(body).toEqual(id);
                });
        });
    })
});