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
    getOneByUsername: () => fakeUsers,
}

jest.mock('./users.service', () => jest.fn().mockImplementation(() => ServiceStub));
jest.mock('jsonwebtoken', () => {
    return {
      sign: jest.fn().mockImplementation((payload, secretOrPrivateKey, options, callback) => {
        return fakeToken;
      })
    };
});

jest.mock('bcrypt', () => {
    return {
        compare: jest.fn().mockImplementation((password, compare_password) => {
            return true;
        })
    }
});

describe('auth service', () => {
    let service;
    beforeAll(() => {
        service = new Auth();
    });

    test('Test getUser', async() => { 
        const body = await service.getUser('Inaki', 'password');
        expect(body[0]._id).toEqual(1);
    });

    test('Test signToken', async() => { 
        const body = await service.signToken(fakeUsers);
        expect(body.token).toEqual(fakeToken);
    });
});