require('dotenv').config();
const mongoose = require('mongoose');
const Menu = require('./models/menus.model');
const Role = require('./models/roles.model');
const RoleMenu = require('./models/role_menus.model');
const counterService = require('./services/counter.service');

const run = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/hospital_db';
        console.log(`Connecting to DB: ${uri}`);
        await mongoose.connect(uri);
        console.log('Connected.');

        // 1. Check Menu
        let menu = await Menu.findOne({ route: '/menus' });
        if (!menu) {
            console.log('Menu "/menus" missing. Creating...');
            const id = await counterService.getNextSequence('menuId');
            menu = new Menu({
                id: id,
                name: 'Menus',
                route: '/menus',
                icon: 'menu'
            });
            await menu.save();
            console.log(`Created Menu: ID=${menu.id}, Name=${menu.name}`);
        } else {
            console.log(`Found Menu: ID=${menu.id}, Name=${menu.name}, Route=${menu.route}`);
        }

        // 2. Check Admin Role
        const role = await Role.findOne({ id: 8 }); // Assuming Admin is 8 from logs
        if (!role) {
            console.error('Role 8 not found! Searching by name...');
            const adminRole = await Role.findOne({ name: { $regex: /admin/i } });
            if (adminRole) {
                console.log(`Found Admin Role by name: ${adminRole.name} (ID: ${adminRole.id})`);
            } else {
                console.error('CRITICAL: Admin role not found.');
                return;
            }
        } else {
            console.log(`Found Role 8: ${role.name}`);
        }

        const targetRoleId = role ? role.id : 8;

        // 3. Fix RoleMenu
        const rm = await RoleMenu.findOne({ role_id: targetRoleId, menu_id: menu.id });
        if (!rm) {
            console.log('RoleMenu link missing. Creating...');
            await RoleMenu.create({ role_id: targetRoleId, menu_id: menu.id });
            console.log('RoleMenu link created.');
        } else {
            console.log('RoleMenu link exists.');
            // Force verify values
            if (rm.role_id !== targetRoleId || rm.menu_id !== menu.id) {
                console.log('Mismatch in RoleMenu! Updating...');
                rm.role_id = targetRoleId;
                rm.menu_id = menu.id;
                await rm.save();
                console.log('Updated.');
            }
        }

        // 4. Verification
        console.log('--- VERIFICATION ---');
        const roleMenus = await RoleMenu.find({ role_id: targetRoleId }).populate('menu');
        console.log(`Total RoleMenus for Role ${targetRoleId}: ${roleMenus.length}`);

        const valid = roleMenus.filter(r => r.menu);
        console.log(`Valid Populated Menus: ${valid.length}`);

        const myEntry = roleMenus.find(r => r.menu_id === menu.id);
        if (myEntry) {
            console.log(`Ref Check: ${myEntry.menu ? 'POPULATED OK' : 'POPULATE FAILED'}`);
        } else {
            console.log('Entry not found in list!');
        }

    } catch (e) {
        console.error('Error:', e);
    } finally {
        await mongoose.disconnect();
    }
};

run();
