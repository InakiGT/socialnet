const Cache = require('./redis.service');

const fakeCache = [
    {
        _id: 20,
        content: 'Content',
    }
];

jest.mock('./redis.client', () => {
    return {
        connect: jest.fn().mockImplementation(() => {
            return {};
        }),
        hSet: jest.fn().mockImplementation((table, key, data, callback) => {
            return true;
        }),
        hGetAll: jest.fn().mockImplementation((table, callback) => {
            return [ ...fakeCache ];
        }),
        hGet: jest.fn().mockImplementation((table, key, callback) => {
            return fakeCache[0];
        }),
    }
});

describe('Cache service', () => {
    let cache = null;

    beforeAll(() => {
        cache = new Cache();
    });

    describe('Tests for insert', () => {
        test('should return true', async() => {
            const body = await cache.insert('collection', '1');
            expect(body).toEqual(true);
        });
    });
    
    describe('Test fot get all', () => {
        test('should return a list of elements', async() => {
            const body = await cache.getAll('collection');
            expect(body).toBeTruthy();
            expect(body.length).toEqual(fakeCache.length);
        });
    });

    describe('Test for get one', () => {
        test('should return an element', async() => {
            const body = await cache.getOne('collection', '1');
            expect(body._id).toEqual(fakeCache[0]._id);
        });
    });
});