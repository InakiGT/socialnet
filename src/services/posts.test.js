const Post = require('./posts.service');
const fakePosts = [
    {
        _id: 1,
        content: 'This is a post',
        userId: 20,
        pollId: 2120,
        privacy: 'public',
        location: 'CDMX',
        created_at: new Date(),
    },
];

const DbStub = {
    getAll: () => [ ...fakePosts ],
    getOne: () => fakePosts[0],
    create: () => {
        fakePosts.push({
            _id: 2,
            content: 'This is another post',
            userId: 20,
            pollId: null,
            privacy: 'just-friends',
            location: 'BOGOTA',
            created_at: new Date(),
        });

        return [ ...fakePosts ];
    },
    update: () => {
        const index = fakePosts.findIndex(item => item._id === 1);
        const item = fakePosts[index];
        fakePosts[index] = {
            ...item,
            content: 'This is the same post',
        };
        return fakePosts;
    },
    remove: () => {
        fakePosts.pop();
        return fakePosts.length;
    },
};

jest.mock('../db/mongo/mongo.lib' || '../db', () => jest.fn().mockImplementation(() => DbStub));

describe('posts service', () => {
    let service;
    beforeAll(() => {
        service = new Post();
        jest.clearAllMocks();
    });

    test('Test get all service', async() => {
        const body = await service.getAll({});
        expect(body[0].userId).toEqual(20);
    });

    test('Test get one service', async () => {
        const body = await service.getOne();
        expect(body._id).toEqual(1);
    });

    test('Test post service', async() => {
        const body = await service.create();
        expect(body.length).toEqual(2);
    });

    test('Test update service', async() => {
        const body = await service.update();
        expect(body[0].content).toEqual('This is the same post');
    });

    test('Test remove servide', async() => {
        const body = await service.remove();
        expect(body).toEqual(1);
    });
});