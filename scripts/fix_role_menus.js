const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Role = require('../models/roles.model');
const RoleMenu = require('../models/role_menus.model');
const Menu = require('../models/menus.model');
const User = require('../models/users.model');
const connectDB = require('../config/db');

dotenv.config();

const fixMenusForAllAdmins = async () => {
    await connectDB();

    try {
        console.log('=== Checking Database State ===\n');

        // Find all users
        const users = await User.find({}).select('-password');
        console.log(`Total users: ${users.length}`);
        users.forEach(u => console.log(`  - ${u.email} (role_id: ${u.role_id})`));

        // Find all roles
        const roles = await Role.find({});
        console.log(`\nTotal roles: ${roles.length}`);
        roles.forEach(r => console.log(`  - ${r.name} (id: ${r.id})`));

        // Find admin role
        const adminRole = await Role.findOne({ name: 'Admin' });
        if (!adminRole) {
            console.error('\nERROR: Admin role not found!');
            process.exit(1);
        }
        console.log(`\nAdmin role ID: ${adminRole.id}`);

        // Find all users with admin role
        const adminUsers = await User.find({ role_id: adminRole.id }).select('-password');
        console.log(`\nAdmin users: ${adminUsers.length}`);
        adminUsers.forEach(u => console.log(`  - ${u.email}`));

        // Get all menus
        const allMenus = await Menu.find({});
        console.log(`\nTotal menus: ${allMenus.length}`);

        // Clear existing role-menu assignments for admin
        await RoleMenu.deleteMany({ role_id: adminRole.id });
        console.log(`\nCleared existing menu assignments for admin role (id: ${adminRole.id})`);

        // Create new assignments
        let count = 0;
        for (const menu of allMenus) {
            try {
                const roleMenu = new RoleMenu({
                    role_id: adminRole.id,
                    menu_id: menu.id
                });
                await roleMenu.save();
                count++;
                console.log(`Linked: ${menu.name}`);
            } catch (err) {
                console.error(`Error linking ${menu.name}:`, err.message);
            }
        }

        console.log(`\n✅ Successfully linked ${count} menus to admin role (id: ${adminRole.id})`);

        // Verify
        const verify = await RoleMenu.find({ role_id: adminRole.id });
        console.log(`\nVerification: Found ${verify.length} role-menus for admin`);

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

fixMenusForAllAdmins();
