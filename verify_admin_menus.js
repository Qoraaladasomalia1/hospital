require('dotenv').config();
const mongoose = require('mongoose');
const Role = require('./models/roles.model');
const Menu = require('./models/menus.model');
const RoleMenu = require('./models/role_menus.model');

const verifyAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hospital_db');

        console.log('--- VERIFY ADMIN MENUS ---');

        const adminRole = await Role.findOne({ name: 'Admin' });
        if (!adminRole) {
            console.log('Admin role not found!');
            return;
        }
        console.log(`Admin Role ID: ${adminRole.id}`);

        const roleMenus = await RoleMenu.find({ role_id: adminRole.id }).populate('menu');
        console.log(`Found ${roleMenus.length} RoleMenu entries for Admin.`);

        let validCount = 0;
        roleMenus.forEach(rm => {
            if (rm.menu) {
                console.log(` - Valid Menu: ${rm.menu.name} (Route: ${rm.menu.route})`);
                validCount++;
            } else {
                console.log(` - INVALID Menu (ID: ${rm.menu_id})`);
            }
        });

        console.log(`Summary: ${validCount} valid menus.`);
        console.log('--- END ---');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
};

verifyAdmin();
