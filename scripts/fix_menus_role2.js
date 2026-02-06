const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Role = require('../models/roles.model');
const RoleMenu = require('../models/role_menus.model');
const Menu = require('../models/menus.model');
const connectDB = require('../config/db');

dotenv.config();

const linkMenusToRole2 = async () => {
    await connectDB();

    try {
        // Check what role_id = 2 is
        const role2 = await Role.findOne({ id: 2 });
        console.log('Role ID 2:', role2);

        // Check role_id = 5  
        const role5 = await Role.findOne({ id: 5 });
        console.log('Role ID 5:', role5);

        // Get all menus
        const allMenus = await Menu.find({});
        console.log(`\nTotal menus: ${allMenus.length}`);

        // Clear existing for role_id 2
        await RoleMenu.deleteMany({ role_id: 2 });
        console.log('Cleared existing menus for role_id 2');

        // Link all menus to role_id 2
        let count = 0;
        for (const menu of allMenus) {
            try {
                const roleMenu = new RoleMenu({
                    role_id: 2,
                    menu_id: menu.id
                });
                await roleMenu.save();
                count++;
                console.log(`Linked: ${menu.name} to role_id 2`);
            } catch (err) {
                console.error(`Error linking ${menu.name}:`, err.message);
            }
        }

        console.log(`\n✅ Successfully linked ${count} menus to role_id 2`);

        // Verify
        const verify = await RoleMenu.find({ role_id: 2 });
        console.log(`Verification: ${verify.length} menus for role_id 2`);

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

linkMenusToRole2();
