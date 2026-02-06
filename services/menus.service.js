const Menu = require('../models/menus.model');
const counterService = require('./counter.service');

const createMenu = async (menuData) => {
    const id = await counterService.getNextSequence('menuId');
    const menu = new Menu({ ...menuData, id });
    return await menu.save();
};

const getAllMenus = async () => {
    return await Menu.find({}).populate('parent');
};

const getMenuById = async (id) => {
    return await Menu.findOne({ id: id }).populate('parent').populate('children');
};

const updateMenu = async (id, menuData) => {
    return await Menu.findOneAndUpdate({ id: id }, menuData, { new: true });
};

const deleteMenu = async (id) => {
    return await Menu.findOneAndDelete({ id: id });
};

module.exports = {
    createMenu,
    getAllMenus,
    getMenuById,
    updateMenu,
    deleteMenu
};
