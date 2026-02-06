const rolePermissionService = require('../services/role_permissions.service');

const createRolePermission = async (req, res) => {
    try {
        // req.body should have role_id and permission_id
        const rolePermission = await rolePermissionService.createRolePermission(req.body);
        res.status(201).json(rolePermission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllRolePermissions = async (req, res) => {
    try {
        const rolePermissions = await rolePermissionService.getAllRolePermissions();
        res.status(200).json(rolePermissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRolePermissionsByRoleId = async (req, res) => {
    try {
        const rolePermissions = await rolePermissionService.getRolePermissionsByRoleId(req.params.roleId);
        res.status(200).json(rolePermissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteRolePermission = async (req, res) => {
    try {
        const { roleId, permissionId } = req.params;
        const result = await rolePermissionService.deleteRolePermission(roleId, permissionId);
        if (!result) {
            return res.status(404).json({ message: 'Role Permission association not found' });
        }
        res.status(200).json({ message: 'Role Permission association deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createRolePermission,
    getAllRolePermissions,
    getRolePermissionsByRoleId,
    deleteRolePermission
};
