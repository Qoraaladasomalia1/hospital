require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/users.model');
const Role = require('./models/roles.model');

const debugUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hospital_db');

        console.log('--- USERS & ROLES ---');

        const roles = await Role.find({});
        const roleMap = {};
        roles.forEach(r => roleMap[r.id] = r.name);

        console.log('Available Roles:', roleMap);

        const users = await User.find({});
        users.forEach(u => {
            const roleName = roleMap[u.role_id] || 'UNKNOWN_ROLE';
            console.log(`User: ${u.email} | RoleID: ${u.role_id} (${roleName})`);
        });

        console.log('--- END ---');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
};

debugUsers();
