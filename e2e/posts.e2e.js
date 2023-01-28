const request = require('supertest');
const { MongoClient } = require('mongodb');

const createApp = require('../src/app');
const { config } = require('../src/config/config');

const DB_NAME = config.dbName;
const MONGO_URI = config.dbUrl;
const COLLECTION = 'posts';

describe('Test for Posts', () => {
    let app;
    let server;
    let db;

    beforeAll(async () => {
        app = await createApp();
        server = app.listen(3001);
        const client = new MongoClient(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        await client.connect();
        db = client.db(DB_NAME);
    });

    afterAll(async () => {
       await server.close(); 
       await db.dropDatabase();
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
                    expect(body._id).toEqual(id);
                });
        });
    });

    describe('Test [POST]', () => {
        test('should return a new post', () => {
            // Arrange
            const seedData = {
                content: 'Hello there',
                privacy: 'public',
                location: 'New York',
            }

            // Act
            return request(app)
                .post('/api/v1/posts')
                .send(seedData)
                .set('Accept', 'application/json')
                .expect(201)
                .then(({ body }) => {
                    // Assert
                    expect(body.acknowledged).toEqual(true);
                });
        });
    });

    describe('Test [PUT]', () => {
        test('should return an updated post', async() => {
            // Arrange
            const seedData = await db.collection(COLLECTION).insertOne({
                content: 'Hello there',
                privacy: 'public',
                location: 'New York',
            });
            const id = seedData.insertedId.toString();

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
                    expect(body.modifiedCount).toEqual(1);
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
                .expect(201)
                .then(({ body }) => {
                    // Assert
                    expect(body).toEqual(id);
                });
        });
    });
})