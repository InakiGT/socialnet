const mockGetAll = jest.fn();
const mockGetOne = jest.fn();
const mockCreate = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();

const request = require('supertest');

const createApp = require('../src/app');
const { generateManyPosts, generateOnePost } = require('../src/fakes/post.fake');

jest.mock('../src/db/mongo/mongo.lib', () => jest.fn().mockImplementation(() => ({
    getAll: mockGetAll,
    getOne: mockGetOne,
    create: mockCreate,
    update: mockUpdate,
    remove: mockDelete,
})));

describe('Test for /api/v1/posts', () => {
    let app;
    let server;

    beforeAll(async () => {
        app = await createApp();
        server = app.listen(3001);
    });

    afterAll(async () => {
        await server.close();
    });
    
    describe('Test [GET]', () => {
        test('should return posts list', () => { 
            // Arrange
            const fakePosts = generateManyPosts(5);
            mockGetAll.mockResolvedValue(fakePosts);

            // Act
            return request(app)
                .get('/api/v1/posts')
                .expect(200)
                .then(({ body }) => {
                    // Assert
                    expect(body.length).toEqual(fakePosts.length);
                });
        });

        test('should return one post', () => {
            // Arrange
            const fakePost = generateOnePost();
            mockGetOne.mockResolvedValue(fakePost);

            // Act
            return request(app)
                .get('/api/v1/posts/1')
                .expect(200)
                .then(({ body }) => {
                    // Assert
                    expect(body.privacy).toEqual('public');
                });
        });
    });

    describe('Test [POST]', () => {
        test('should return a new post', () => { 
            // Arrange
            const fakePost = {
                _id: 20,
                content: 'Hello there',
                userId: 'q3213-12312312-123123',
                pollId: null,
                privacy: 'public',
                location: 'New York',
                createdat: new Date(),
            }
            mockCreate.mockResolvedValue(fakePost);

            // Act
            return request(app)
                .post('/api/v1/posts')
                .expect(201)
                .then(({ body }) => {
                    // Assert
                    expect(body._id).toEqual(20);
                });
        });
    });

    describe('Test [PUT]', () => {
        test('should return an updated post', () => {
            // Arrange
            const fakeUpdatedPost = {
                _id: 20,
                content: 'Hello there, this is the same post',
                userId: 'q3213-12312312-123123',
                pollId: null,
                privacy: 'public',
                location: 'New York',
                createdat: new Date(),
            }
            mockUpdate.mockResolvedValue(fakeUpdatedPost);

            // Act
            return request(app)
                .put('/api/v1/posts/20')
                .expect(201)
                .then(({ body }) => {
                    // Assert
                    expect(body.content).toEqual('Hello there, this is the same post');
                });
        });
    });

    describe('Test [DELETE]', () => {
        test('should return a post id', () => {
            // Arrange
            mockDelete.mockResolvedValue(20);

            // Act
            return request(app)
                .delete('/api/v1/posts/20')
                .expect(201)
                .then(({ body }) => {
                    // Assert
                    expect(body).toEqual(20);
                });
        });
    })
});