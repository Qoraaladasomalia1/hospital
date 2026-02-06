require('dotenv').config();
const mongoose = require('mongoose');
const RoleMenu = require('./models/role_menus.model');

const migrateMenus = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hospital_db');

        console.log('--- START MIGRATION (Role 8 -> Role 2) ---');

        const sourceRoleMenus = await RoleMenu.find({ role_id: 8 });
        console.log(`Found ${sourceRoleMenus.length} menus in Role 8.`);

        if (sourceRoleMenus.length === 0) {
            console.log('Nothing to copy. Exiting.');
            return;
        }

        let copiedCount = 0;
        for (const rm of sourceRoleMenus) {
            // Check if exists for Role 2
            const exists = await RoleMenu.findOne({ role_id: 2, menu_id: rm.menu_id });
            if (!exists) {
                await RoleMenu.create({
                    role_id: 2,
                    menu_id: rm.menu_id
                });
                copiedCount++;
                console.log(`Copied Menu ID ${rm.menu_id} to Role 2`);
            } else {
                console.log(`Menu ID ${rm.menu_id} already exists for Role 2`);
            }
        }

        console.log(`\nMigration Complete. Copied ${copiedCount} menus.`);
        console.log('--- END ---');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
};

migrateMenus();
