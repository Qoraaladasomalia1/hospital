require('dotenv').config();
const mongoose = require('mongoose');
const Menu = require('./models/menus.model');
const Role = require('./models/roles.model');
const RoleMenu = require('./models/role_menus.model');
const counterService = require('./services/counter.service');

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hospital_db');
        console.log('Connected to DB');

        // 1. Find Admin Role
        const adminRole = await Role.findOne({ name: { $regex: /admin/i } });
        if (!adminRole) {
            console.error('Admin role not found!');
            return;
        }
        console.log(`Found Admin Role: ${adminRole.name} (ID: ${adminRole.id})`);

        // 2. Find or Create Menu
        let menu = await Menu.findOne({ route: '/menus' });
        if (!menu) {
            console.log('Menu "/menus" not found. Creating...');
            const id = await counterService.getNextSequence('menuId');
            menu = new Menu({
                id: id,
                name: 'Menus',
                route: '/menus',
                icon: 'menu', // or 'list'
                parent_id: null
            });
            await menu.save();
            console.log('Menu created.');
        } else {
            console.log(`Menu "/menus" found (ID: ${menu.id}).`);
        }

        // 3. Assign to Role
        const existingRoleMenu = await RoleMenu.findOne({ role_id: adminRole.id, menu_id: menu.id });
        if (!existingRoleMenu) {
            console.log('Assigning menu to Admin role...');
            await RoleMenu.create({ role_id: adminRole.id, menu_id: menu.id });
            console.log('Assigned.');
        } else {
            console.log('Menu already assigned to Admin role.');
        }

    } catch (e) {
        console.error('Error:', e);
    } finally {
        await mongoose.disconnect();
    }
};

run();
