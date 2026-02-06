const roleMenuService = require('../services/role_menus.service');

const createRoleMenu = async (req, res) => {
    try {
        // req.body should have role_id and menu_id
        const roleMenu = await roleMenuService.createRoleMenu(req.body);
        res.status(201).json(roleMenu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllRoleMenus = async (req, res) => {
    try {
        const roleMenus = await roleMenuService.getAllRoleMenus();
        res.status(200).json(roleMenus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRoleMenusByRoleId = async (req, res) => {
    try {
        console.log(`Getting role menus for Role ID: ${req.params.roleId}`);
        const roleMenus = await roleMenuService.getRoleMenusByRoleId(req.params.roleId);
        console.log(`Found ${roleMenus.length} menus after filter.`);
        res.status(200).json(roleMenus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteRoleMenu = async (req, res) => {
    try {
        const { roleId, menuId } = req.params;
        const result = await roleMenuService.deleteRoleMenu(roleId, menuId);
        if (!result) {
            return res.status(404).json({ message: 'Role Menu association not found' });
        }
        res.status(200).json({ message: 'Role Menu association deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createRoleMenu,
    getAllRoleMenus,
    getRoleMenusByRoleId,
    deleteRoleMenu
};
