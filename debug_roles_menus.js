require('dotenv').config();
const mongoose = require('mongoose');
const Role = require('./models/roles.model');
const Menu = require('./models/menus.model');
const RoleMenu = require('./models/role_menus.model');

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hospital_db');
        console.log('Connected.');

        console.log('\n--- ROLES ---');
        const roles = await Role.find({});
        roles.forEach(r => console.log(`ID: ${r.id}, Name: ${r.name}`));

        console.log('\n--- MENUS ---');
        const menus = await Menu.find({});
        menus.forEach(m => console.log(`ID: ${m.id}, Name: ${m.name}, Route: ${m.route}`));

        console.log('\n--- ROLE MENUS (for Admin roles) ---');
        for (const role of roles) {
            if (role.name.toLowerCase().includes('admin')) {
                console.log(`Checking Role: ${role.name} (${role.id})`);
                const rms = await RoleMenu.find({ role_id: role.id });
                console.log(`  Found ${rms.length} menu assignments.`);
                for (const rm of rms) {
                    const m = menus.find(menu => menu.id === rm.menu_id);
                    console.log(`    - Menu ID: ${rm.menu_id} -> ${m ? m.name : 'UNKNOWN'}`);
                }
            }
        }

    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
};

run();
