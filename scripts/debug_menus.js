const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Role = require('../models/roles.model');
const RoleMenu = require('../models/role_menus.model');
const Menu = require('../models/menus.model');
const connectDB = require('../config/db');

dotenv.config();

const debug = async () => {
    await connectDB();

    try {
        // Check admin role
        const adminRole = await Role.findOne({ name: 'Admin' });
        console.log('Admin role:', adminRole);

        // Check all menus
        const allMenus = await Menu.find({});
        console.log(`\nTotal menus in DB: ${allMenus.length}`);
        if (allMenus.length > 0) {
            console.log('First menu:', allMenus[0]);
        }

        // Check role-menus
        const roleMenus = await RoleMenu.find({});
        console.log(`\nTotal role-menus: ${roleMenus.length}`);
        if (roleMenus.length > 0) {
            console.log('First role-menu:', roleMenus[0]);
        }

        // Check specific role-menus for admin
        if (adminRole) {
            const adminMenus = await RoleMenu.find({ role_id: adminRole.id });
            console.log(`\nMenus for admin role (id: ${adminRole.id}): ${adminMenus.length}`);
            if (adminMenus.length > 0) {
                console.log('First admin menu:', adminMenus[0]);
            }
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

debug();
