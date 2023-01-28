const { faker } = require('@faker-js/faker');

const generateOnePost = () => ({
    _id: faker.datatype.uuid(),
    content: faker.lorem.sentence(),
    userId: faker.datatype.uuid(),
    pollId: faker.datatype.uuid(),
    privacy: faker.helpers.arrayElement(['public']),
    location: faker.address.cityName(),
    created_at: faker.datatype.datetime(),
});

const generateManyPosts = (size) => {
    const array = [];
    for(let i = 0; i < size; i++) {
        array.push({
            _id: faker.datatype.uuid(),
            content: faker.lorem.sentence(),
            userId: faker.datatype.uuid(),
            pollId: faker.datatype.uuid(),
            privacy: faker.helpers.arrayElement(['public']),
            location: faker.address.cityName(),
            created_at: faker.datatype.datetime(),
        });
    }

    return array;
}

module.exports = {
    generateOnePost,
    generateManyPosts,
}