const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hospitaldb')
    .then(async () => {
        console.log('Connected to MongoDB');

        try {
            // Get the doctors collection
            const db = mongoose.connection.db;
            const doctorsCollection = db.collection('doctors');

            // List all indexes
            console.log('\nCurrent indexes on doctors collection:');
            const indexes = await doctorsCollection.indexes();
            console.log(JSON.stringify(indexes, null, 2));

            // Drop the user_id_1 index if it exists
            try {
                await doctorsCollection.dropIndex('user_id_1');
                console.log('\n✅ Successfully dropped user_id_1 index');
            } catch (error) {
                if (error.code === 27 || error.codeName === 'IndexNotFound') {
                    console.log('\n⚠️  Index user_id_1 does not exist (already dropped or never created)');
                } else {
                    throw error;
                }
            }

            // List indexes after dropping
            console.log('\nIndexes after dropping user_id_1:');
            const indexesAfter = await doctorsCollection.indexes();
            console.log(JSON.stringify(indexesAfter, null, 2));

            console.log('\n✅ Migration completed successfully!');
            process.exit(0);
        } catch (error) {
            console.error('❌ Error during migration:', error);
            process.exit(1);
        }
    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    });
