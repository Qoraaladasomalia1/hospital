require('dotenv').config();
const mongoose = require('mongoose');
const Role = require('./models/roles.model');

const debugRoles = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hospital_db');

        console.log('--- ROLES ---');
        const roles = await Role.find({});
        roles.forEach(r => console.log(`Role: ${r.name} | ID: ${r.id} | _id: ${r._id}`));
        console.log('--- END ---');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
};

debugRoles();
