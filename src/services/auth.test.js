const Auth = require('./auth.service');

const fakeUsers = [
    { 
        _id: 1,
        username: 'Iñaki',
        name: 'Iñaki',
        password: 'password',
        birthday: new Date(),
    },
];

const fakeToken = '-Iy[WsDpd]gw,:6';

const ServiceStub = {
    getOneByUsername: () => fakeUsers[0],
}

jest.mock('./users.service', () => jest.fn().mockImplementation(() => ServiceStub));
jest.mock('jsonwebtoken', () => {
    return {
      sign: jest.fn().mockImplementation((payload, secretOrPrivateKey, options, callback) => {
        return fakeToken;
      })
    };
});

describe('auth service', () => {
    let service;
    beforeAll(() => {
        service = new Auth();
    });

    test('Test getUser', async() => { 
        const body = await service.getUser('Inaki', 'password');
        expect(body._id).toEqual(1);
    });

    test('Test signToken', async() => { 
        const body = await service.signToken(fakeUsers[0]);
        expect(body.token).toEqual(fakeToken);
    });
});