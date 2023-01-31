const mockGetAll = jest.fn();
const mockGetOne = jest.fn();
const mockCreate = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();

const request = require('supertest');
const createApp = require('../src/app');
const { generateOneUser, generateManyUsers } = require('../src/fakes/user.fake');

jest.mock('../src/db/mongo/mongo.lib', () => jest.fn().mockImplementation(() => ({
    getAll: mockGetAll,
    getOne: mockGetOne,
    create: mockCreate,
    update: mockUpdate,
    remove: mockDelete,
})));

describe('Test for /api/v1/users', () => {
    let app;
    let server;
    beforeAll(async() => {
        app = await createApp();
        server = app.listen(3002);
    });

    afterAll(async() => {
        await server.close();
    });

    describe('Test [GET]', () => {
        test('should return a list of users', () => {
            // Arrange
            const fakeUsers = generateManyUsers(5);
            mockGetAll.mockResolvedValue(fakeUsers);
            // Act
            return request(app)
                .get('/api/v1/users')
                .expect(200)
                .then(({ body }) => {
                    // Assert
                    expect(body.length).toEqual(fakeUsers.length);
                });
        });
        
        test('should return a user', () => {
            // Arrange
            const fakeUser = generateOneUser();
            mockGetOne.mockResolvedValue(fakeUser);
            // Act
            return request(app)
                .get('/api/v1/users/1')
                .expect(200)
                .then(({ body }) => {
                    // Assert
                    expect(body.name).toEqual(fakeUser.name);
                });
        });
    });

    describe('Test [POST]', () => {
        test('should return a new user', () => {
            // Arrange
            const fakeUser = generateOneUser();
            delete fakeUser._id, delete fakeUser.created_at
            mockCreate.mockResolvedValue(fakeUser);
            
            // Act
            return request(app)
                .post('/api/v1/users')
                .send(fakeUser)
                .expect(201)
                .then(({ body }) => {
                    // Assert
                    expect(body.name).toEqual(fakeUser.name);
                });
        });
    });

    describe('Test [PUT]', () => {
        test('should return an updated user', async() => {
            // Arrange
            const fakeUser = generateOneUser();
            mockUpdate.mockResolvedValue(fakeUser.username);
            // Act
            return request(app)
                .put('/api/v1/users/1')
                .send({username: fakeUser.username})
                .expect(201)
                .then(({ body }) => {
                    // Assert
                    expect(body).toEqual(fakeUser.username);
                });
        });
    });

    describe('Test [DELTE]', () => {
        test('should return the id of deleted user', async() => {
            // Arrange
            const { _id } = generateOneUser();
            mockDelete.mockResolvedValue(_id);
            // Act
            return request(app)
                .delete(`/api/v1/users/${_id}`)
                .expect(202)
                .then(({ body }) => {
                    // Assert
                    expect(body).toEqual(_id);
                });
        });
    });
});