require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/users.model');

const fixUserRole = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hospital_db');

        console.log('--- FIX USER ROLE ---');

        // Find users with role_id 2
        const users = await User.find({ role_id: 2 });
        console.log(`Found ${users.length} users with invalid Role ID 2.`);

        if (users.length > 0) {
            const result = await User.updateMany(
                { role_id: 2 },
                { $set: { role_id: 8 } }
            );
            console.log(`Updated ${result.modifiedCount} users to Role ID 8 (Admin).`);
        } else {
            console.log('No users found with Role ID 2.');
        }

        console.log('--- END ---');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
};

fixUserRole();
