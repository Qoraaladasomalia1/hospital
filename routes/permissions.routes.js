const express = require('express');
const router = express.Router();
const permissionsController = require('../controllers/permissions.controller');

router.post('/', permissionsController.createPermission);
router.get('/', permissionsController.getAllPermissions);
router.get('/:id', permissionsController.getPermissionById);
router.put('/:id', permissionsController.updatePermission);
router.delete('/:id', permissionsController.deletePermission);

module.exports = router;
