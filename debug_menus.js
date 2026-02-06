require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/users.model');
const Role = require('./models/roles.model');
const Menu = require('./models/menus.model');
const RoleMenu = require('./models/role_menus.model');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const debugMenus = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hospital_db');

        console.log('--- START DEBUG ---');
        await sleep(100);

        const users = await User.find({});
        console.log(`\nFound ${users.length} users:`);
        for (const u of users) {
            console.log(`User: ${u.email} | Role ID: ${u.role_id}`);
            await sleep(50);
        }

        const roles = await Role.find({});
        console.log(`\nFound ${roles.length} roles.`);

        for (const role of roles) {
            console.log(`\nChecking Role: ${role.name} (ID: ${role.id})`);
            const roleMenus = await RoleMenu.find({ role_id: role.id }).populate('menu');

            if (roleMenus.length === 0) {
                console.log(`  No menus assigned to this role.`);
                continue;
            }

            let validCount = 0;
            let invalidCount = 0;
            for (const rm of roleMenus) {
                if (rm.menu) {
                    // console.log(`  - Menu ID ${rm.menu_id}: ${rm.menu.name} (VALID)`);
                    validCount++;
                } else {
                    console.log(`  - Menu ID ${rm.menu_id}: NULL (INVALID)`);
                    invalidCount++;
                }
            }
            console.log(`  Summary: ${validCount} Valid, ${invalidCount} Invalid`);
            await sleep(50);
        }

        console.log('\n--- END DEBUG ---');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
};

debugMenus();
