const RolePermission = require('../models/role_permissions.model');

const createRolePermission = async (data) => {
    // data should contain role_id and permission_id
    const rolePermission = new RolePermission(data);
    return await rolePermission.save();
};

const getAllRolePermissions = async () => {
    return await RolePermission.find({}).populate('role').populate('permission');
};

const getRolePermissionsByRoleId = async (roleId) => {
    return await RolePermission.find({ role_id: roleId }).populate('permission');
};

const deleteRolePermission = async (roleId, permissionId) => {
    return await RolePermission.findOneAndDelete({ role_id: roleId, permission_id: permissionId });
};

module.exports = {
    createRolePermission,
    getAllRolePermissions,
    getRolePermissionsByRoleId,
    deleteRolePermission
};
