const { faker } = require('@faker-js/faker');

const generateOneUser = () => ({
    _id: faker.datatype.uuid(),
    biography: faker.lorem.sentence(),
    name: faker.helpers.arrayElement(['inaki']),
    username: faker.company.name(),
    password: faker.datatype.uuid(),
    birthday: faker.datatype.datetime(),
    created_at: faker.datatype.datetime(),
});

const generateManyUsers = (size) => {
    const array = [];
    for(let i = 0; i < size; i++) {
        array.push({
            _id: faker.datatype.uuid(),
            biography: faker.lorem.sentence(),
            name: faker.company.name(),
            username: faker.company.name(),
            password: faker.datatype.uuid(),
            location: faker.address.cityName(),
            created_at: faker.datatype.datetime(),
        });
    }

    return array;
}

module.exports = {
    generateOneUser,
    generateManyUsers,
}