const express = require('express');
const router = express.Router();
const menusController = require('../controllers/menus.controller');

router.post('/', menusController.createMenu);
router.get('/', menusController.getAllMenus);
router.get('/:id', menusController.getMenuById);
router.put('/:id', menusController.updateMenu);
router.delete('/:id', menusController.deleteMenu);

module.exports = router;
