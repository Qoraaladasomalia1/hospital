const express = require('express');
const router = express.Router();
const roleMenusController = require('../controllers/role_menus.controller');

router.post('/', roleMenusController.createRoleMenu);
router.get('/', roleMenusController.getAllRoleMenus);
router.get('/:roleId', roleMenusController.getRoleMenusByRoleId);
router.delete('/:roleId/:menuId', roleMenusController.deleteRoleMenu);

module.exports = router;
