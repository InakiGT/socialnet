const mockGetUser = jest.fn();
const mockSignToken = jest.fn();
const mockCompare = jest.fn();

const request = require('supertest');

const createApp = require('../src/app');

jest.mock('../src/services/users.service', () => jest.fn().mockImplementation(() => ({
    getOneByUsername: mockGetUser,
})));

jest.mock('jsonwebtoken', () => {
    return {
        sign: mockSignToken,
    }
});

jest.mock('bcrypt', () => {
    return {
        compare: mockCompare,
    }
})

describe('Test for /api/v1/auth', () => {
    let app;
    let server;

    beforeAll(async() => {
        app = await createApp();
        server = app.listen(3003);
    });

    afterAll(async () => {
        await server.close();
    });

    describe('Test /login [POST]', () => { 
        let user;
        beforeAll(() => {
            user = { _id: '1234', username: 'inaki', password: 'password' };
        });

        test('should return a token', () => { 
            // Arrange
            mockGetUser.mockResolvedValue([user]);
            mockCompare.mockResolvedValue(true);
            mockSignToken.mockResolvedValue('token');

            // Act
            return request(app)
                .post('/api/v1/auth/login')
                .set('Accept', 'application/json')
                .send({
                    username: user.username,
                    password: user.password,
                })
                .expect(200)
                .then(({ body }) => {
                    // Assert
                    expect(body.token).toEqual('token');
                });
        });

        test('should return an Bad Request error', () => {
            // Arrange
            mockGetUser.mockResolvedValue();

            // Act
            return request(app)
                .post('/api/v1/auth/login')
                .set('Accept', 'application/json')
                .send({
                    username: user.username,
                    password: '123456'
                })
                .expect(400)
                .then(({ body }) => {
                    // Assert
                    expect(body.error).toEqual('Bad Request');
                });
        });
    });
})