const Permission = require('../models/permissions.model');
const counterService = require('./counter.service');

const createPermission = async (permissionData) => {
    const id = await counterService.getNextSequence('permissionId');
    const permission = new Permission({ ...permissionData, id });
    return await permission.save();
};

const getAllPermissions = async () => {
    return await Permission.find({});
};

const getPermissionById = async (id) => {
    return await Permission.findOne({ id: id });
};

const updatePermission = async (id, permissionData) => {
    return await Permission.findOneAndUpdate({ id: id }, permissionData, { new: true });
};

const deletePermission = async (id) => {
    return await Permission.findOneAndDelete({ id: id });
};

module.exports = {
    createPermission,
    getAllPermissions,
    getPermissionById,
    updatePermission,
    deletePermission
};
