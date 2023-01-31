const Users = require('../../services/users.service');

const service = new Users();

const user = (_, { id }) => {
    return service.getOne(id);
}

const users = () => {
    return service.getAll({});
}

const addUser = (_, { dto }) => {
    return service.create(dto);
}

const updateUser = (_, { id, dto }) => {
    return service.update(id, dto);
}

const removeUser = (_, { id }) => {
    return service.remove(id);
}

module.exports = {
    user,
    users,
    addUser,
    updateUser,
    removeUser,
}