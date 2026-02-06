require('dotenv').config();
const mongoose = require('mongoose');
const RoleMenu = require('./models/role_menus.model');
const Menu = require('./models/menus.model');
const Role = require('./models/roles.model');

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hospital_db');

        console.log('--- DEBUG START ---');

        const menus = await Menu.find({});
        console.log(`Total Menus: ${menus.length}`);
        const menu33 = menus.find(m => m.route === '/menus');
        if (menu33) {
            console.log(`Menu '/menus': ID=${menu33.id}, Type of ID=${typeof menu33.id}`);
        } else {
            console.log('Menu /menus NOT found!');
        }

        const role8 = await Role.findOne({ id: 8 });
        if (role8) {
            console.log(`Role 8: Name=${role8.name}`);
        } else {
            console.log('Role 8 NOT found!');
        }

        const roleMenus = await RoleMenu.find({ role_id: 8 });
        console.log(`RoleMenus for Role 8: ${roleMenus.length} entries.`);

        const rm33 = roleMenus.find(rm => rm.menu_id === (menu33 ? menu33.id : -1));
        if (rm33) {
            console.log(`RoleMenu entry for Menu 33 FOUND.`);
            console.log(`  menu_id: ${rm33.menu_id} (Type: ${typeof rm33.menu_id})`);

            // Test populate
            const populated = await RoleMenu.findOne({ _id: rm33._id }).populate('menu');
            if (populated.menu) {
                console.log(`  Populate SUCCESS. Menu Name: ${populated.menu.name}`);
            } else {
                console.log('  Populate FAILED (menu is null).');
            }
        } else {
            console.log('RoleMenu entry for Menu 33 NOT found.');
        }

        console.log('--- DEBUG END ---');

    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
};

run();
