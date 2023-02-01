const Users = require('./users.service');

const fakeUsers = [
    {
        _id: 1,
        username: 'Iñakikiriki',
        name: 'iñaki',
        password: '2132nfssada',
        location: 'MX',
        biography: '...',
        website: 'inakidev.com',
    },
];

const DbStub = {
    getAll: () => [...fakeUsers],
    getOne: () => fakeUsers[0],
    getOneByQuery: () => fakeUsers[0],
    create: () => {
        fakeUsers.push({
            _id: 2,
            username: 'Iñakikiriki',
            name: 'iñaki',
            password: '2132nfssada',
            location: 'MX',
            biography: '...',
            website: 'inakidev.com',
        });
        return fakeUsers[1];
    },
    update: () => {
        fakeUsers[0].name = 'Pedro';
        return fakeUsers[0];
    },
    remove: () => {
        const { _id } = fakeUsers.shift();
        return _id;
    },
}

jest.mock('../db/mongo/mongo.lib' || '../db', () => jest.fn().mockImplementation(() => DbStub));

describe('users service', () => {
    let service;
    beforeAll(() => {
        service = new Users();
        jest.clearAllMocks();
    });

    test('Test get all service', async() => {
        const body = await service.getAll({});
        expect(body.length).toEqual(fakeUsers.length);
    });

    test('Test get one service', async() => {
        const body = await service.getOne(1);
        expect(body._id).toEqual(1);
    });

    test('Test get one by username service', async () => {
        const body = await service.getOneByUsername('sdad');
        expect(body._id).toEqual(1);
    });

    test('Test create service ', async() => {
        const body = await service.create({password: ''});
        expect(body._id).toEqual(2);
    });

    test('Test update service', async() => {
        const body = await service.update();
        expect(body.name).toEqual('Pedro');
    });

    test('Test delete service', async() => {
        const body = await service.remove();
        expect(body).toEqual(1);
    });
});