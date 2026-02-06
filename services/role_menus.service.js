const RoleMenu = require('../models/role_menus.model');

const createRoleMenu = async (data) => {
    // data should contain role_id and menu_id
    const roleMenu = new RoleMenu(data);
    return await roleMenu.save();
};

const getAllRoleMenus = async () => {
    return await RoleMenu.find({}).populate('role').populate('menu');
};

const getRoleMenusByRoleId = async (roleId) => {
    const roleMenus = await RoleMenu.find({ role_id: roleId }).populate('menu');
    return roleMenus.filter(rm => rm.menu != null);
};

const deleteRoleMenu = async (roleId, menuId) => {
    return await RoleMenu.findOneAndDelete({ role_id: roleId, menu_id: menuId });
};

module.exports = {
    createRoleMenu,
    getAllRoleMenus,
    getRoleMenusByRoleId,
    deleteRoleMenu
};
