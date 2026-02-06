const menuService = require('../services/menus.service');

const createMenu = async (req, res) => {
    try {
        const menu = await menuService.createMenu(req.body);
        res.status(201).json(menu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllMenus = async (req, res) => {
    try {
        const menus = await menuService.getAllMenus();
        res.status(200).json(menus);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMenuById = async (req, res) => {
    try {
        const menu = await menuService.getMenuById(req.params.id);
        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        }
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMenu = async (req, res) => {
    try {
        const menu = await menuService.updateMenu(req.params.id, req.body);
        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        }
        res.status(200).json(menu);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteMenu = async (req, res) => {
    try {
        const menu = await menuService.deleteMenu(req.params.id);
        if (!menu) {
            return res.status(404).json({ message: 'Menu not found' });
        }
        res.status(200).json({ message: 'Menu deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createMenu,
    getAllMenus,
    getMenuById,
    updateMenu,
    deleteMenu
};
