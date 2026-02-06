const permissionService = require('../services/permissions.service');

const createPermission = async (req, res) => {
    try {
        const permission = await permissionService.createPermission(req.body);
        res.status(201).json(permission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllPermissions = async (req, res) => {
    try {
        const permissions = await permissionService.getAllPermissions();
        res.status(200).json(permissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPermissionById = async (req, res) => {
    try {
        const permission = await permissionService.getPermissionById(req.params.id);
        if (!permission) {
            return res.status(404).json({ message: 'Permission not found' });
        }
        res.status(200).json(permission);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updatePermission = async (req, res) => {
    try {
        const permission = await permissionService.updatePermission(req.params.id, req.body);
        if (!permission) {
            return res.status(404).json({ message: 'Permission not found' });
        }
        res.status(200).json(permission);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deletePermission = async (req, res) => {
    try {
        const permission = await permissionService.deletePermission(req.params.id);
        if (!permission) {
            return res.status(404).json({ message: 'Permission not found' });
        }
        res.status(200).json({ message: 'Permission deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPermission,
    getAllPermissions,
    getPermissionById,
    updatePermission,
    deletePermission
};
