const Role = require('../models/roles.model');
const counterService = require('./counter.service');

const createRole = async (roleData) => {
    const id = await counterService.getNextSequence('roleId');
    const role = new Role({ ...roleData, id });
    return await role.save();
};

const getAllRoles = async () => {
    return await Role.find({});
};

const getRoleById = async (id) => {
    return await Role.findOne({ id: id });
};

const updateRole = async (id, roleData) => {
    return await Role.findOneAndUpdate({ id: id }, roleData, { new: true });
};

const deleteRole = async (id) => {
    return await Role.findOneAndDelete({ id: id });
};

module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole
};
