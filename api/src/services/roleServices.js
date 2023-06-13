const Role = require('../models/role');

const createRole = async (role) => {
    const roleCreated = await Role.create(role);
    return roleCreated;
};

module.exports = {createRole};