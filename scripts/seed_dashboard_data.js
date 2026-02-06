const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Menu = require('../models/menus.model');
const Role = require('../models/roles.model');
const RoleMenu = require('../models/role_menus.model');
const connectDB = require('../config/db');
const counterService = require('../services/counter.service');

dotenv.config();

const seedData = async () => {
    await connectDB();

    try {
        console.log('Clearing existing Menus and RoleMenus...');
        await Menu.deleteMany({});
        await RoleMenu.deleteMany({});

        // Ensure Admin Role exists
        let adminRole = await Role.findOne({ name: 'Admin' });
        if (!adminRole) {
            console.log('Creating Admin Role...');
            const roleId = await counterService.getNextSequence('roleId');
            adminRole = new Role({
                id: roleId,
                name: 'Admin',
                description: 'Administrator with full access'
            });
            await adminRole.save();
        } else {
            console.log('Admin Role already exists.');
        }

        const menusData = [
            { name: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
            { name: 'Users', route: '/users', icon: 'people' },
            { name: 'Departments', route: '/departments', icon: 'apartment' },
            { name: 'Doctors', route: '/doctors', icon: 'medical_services' },
            { name: 'Patients', route: '/patients', icon: 'people_outline' },
            { name: 'Appointments', route: '/appointments', icon: 'calendar_today' },
            { name: 'Doctor Availability', route: '/doctor-availability', icon: 'event_available' },
            { name: 'Settings', route: '/settings', icon: 'settings' },
            { name: 'Logout', route: '/logout', icon: 'logout' }
        ];

        console.log('Seeding Menus...');
        for (const menu of menusData) {
            const menuId = await counterService.getNextSequence('menuId');
            const newMenu = new Menu({
                id: menuId,
                name: menu.name,
                route: menu.route,
                icon: menu.icon
            });
            await newMenu.save();

            // Link to Admin Role
            const roleMenu = new RoleMenu({
                role_id: adminRole.id,
                menu_id: newMenu.id
            });
            await roleMenu.save();
        }

        console.log('Database seeded successfully!');
        process.exit();
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
