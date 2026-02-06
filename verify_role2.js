require('dotenv').config();
const mongoose = require('mongoose');
const RoleMenu = require('./models/role_menus.model');
const Menu = require('./models/menus.model');

const verifyRole2 = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hospital_db');

        console.log('--- VERIFY ROLE ID 2 ---');

        const roleMenus = await RoleMenu.find({ role_id: 2 }).populate('menu');
        console.log(`Found ${roleMenus.length} RoleMenu entries for Role ID 2.`);

        let validCount = 0;
        roleMenus.forEach(rm => {
            if (rm.menu) {
                console.log(` - Valid Menu: ${rm.menu.name}`);
                validCount++;
            } else {
                console.log(` - INVALID Menu (ID: ${rm.menu_id})`);
            }
        });

        console.log(`Summary: ${validCount} valid menus.`);

        if (validCount === 0) {
            console.log('Role 2 has no menus! Checking if we should copy from another role...');
            // Check if Role 8 exists and has menus (from previous confusion)
            const role8Menus = await RoleMenu.countDocuments({ role_id: 8 });
            console.log(`Role 8 has ${role8Menus} entries.`);
        }

        console.log('--- END ---');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
};

verifyRole2();
