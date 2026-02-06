const express = require('express');
const router = express.Router();
const rolePermissionsController = require('../controllers/role_permissions.controller');

router.post('/', rolePermissionsController.createRolePermission);
router.get('/', rolePermissionsController.getAllRolePermissions);
router.get('/:roleId', rolePermissionsController.getRolePermissionsByRoleId);
router.delete('/:roleId/:permissionId', rolePermissionsController.deleteRolePermission);

module.exports = router;
