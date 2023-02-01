const request = require('supertest');
const { MongoClient } = require('mongodb');

const createApp = require('../src/app');
const { config } = require('../src/config/config');

const DB_NAME = 'test';
const MONGO_URI = config.dbUrl;
const COLLECTION = 'posts';

describe('Test for Posts', () => {
    let app;
    let server;
    let db;
    let client;

    beforeAll(async () => {
        app = await createApp();
        server = app.listen(3001);
        client = new MongoClient(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await client.connect();
        db = client.db(DB_NAME);
    });

    afterAll(async () => {
        await db.command({ "drop": COLLECTION });
        await client.close();
        await server.close();
    });

    describe('Test [GET]', () => {
        test('should return a posts list', async () => { 
            // Arrange
            const seedData = await db.collection(COLLECTION).insertMany([
                {
                    content: 'Hello there',
                    privacy: 'public',
                    location: 'New York',
                },
                {
                    content: 'Hello there, this another post',
                    privacy: 'public',
                    location: 'New York',
                }
            ]);

            // Act
            return request(app)
                .get('/api/v1/posts')
                .expect(200)
                .then(({ body }) => {
                    // Assert
                    expect(body.length).toEqual(seedData.insertedCount);
                });
        });

        test('should return a post', async () => {
            // Arrange
            const seedData = await db.collection(COLLECTION).insertOne({
                content: 'Hello there',
                privacy: 'public',
                location: 'New York',
            });
            const id = seedData.insertedId.toString();
            // Act
            return request(app)
                .get(`/api/v1/posts/${id}`)
                .expect(200)
                .then(({ body }) => {
                    // Assert
                    expect(body[0]._id).toEqual(id);
                });
        });
    });

    describe('Test [POST]', () => {
        test('should return a new post', () => {
            // Arrange
            const data = {
                content: 'Hello there',
                privacy: 'public',
                location: 'New York',
            }

            // Act
            return request(app)
                .post('/api/v1/posts')
                .set('Accept', 'application/json')
                .send(data)
                .expect(201)
                .then(({ body }) => {
                    // Assert
                    expect(body.content).toEqual(data.content);
                });
        });

        test('should return Bad request', () => {
            // Arrange
            const data = { content: 'Hello' };

            // Act
            return request(app)
                .post('/api/v1/posts')
                .set('Accept', 'application/json')
                .send(data)
                .expect(400)
                .then(({ body }) => {
                    // Assert
                    expect(body.error).toEqual('Bad Request');
                });
        });
    });

    describe('Test [PUT]', () => {
        let seedData;
        let id;

        beforeAll(async () => {
            seedData = await db.collection(COLLECTION).insertOne({
                content: 'Hello there',
                privacy: 'public',
                location: 'New York',
            });
            id = seedData.insertedId.toString();
        });

        test('should return an updated post', () => {
            // Arrange
            // Act
            return request(app)
                .put(`/api/v1/posts/${id}`)
                .set('Accept', 'application/json')
                .send({
                    content: 'Hello there again'
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
            return request(app)
            .put(`/api/v1/posts/${id}`)
            .set('Accept', 'application/json')
            .send({
                content: 12,
            })
            .expect(400)
            .then(({ body }) => {
                // Assert
                expect(body.error).toEqual('Bad Request');
            });
        });
    });

    describe('Test [DELETE]', () => {
        test('should return post id', async() => {
            // Arrange
            const seedData = await db.collection(COLLECTION).insertOne({
                content: 'I will die',
                privacy: 'public',
                location: 'Bogota',
            });
            const id = seedData.insertedId.toString();

            // Act
            return request(app)
                .delete(`/api/v1/posts/${id}`)
                .expect(202)
                .then(({ body }) => {
                    // Assert
                    expect(body).toEqual(id);
                });
        });
    });
})