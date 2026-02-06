const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    user_id: {
        type: Number,
        required: true,
        ref: 'User',
        validate: {
            validator: async function (v) {
                const User = mongoose.model('User');
                const user = await User.findOne({ id: v });
                return !!user;
            },
            message: props => `User with id ${props.value} does not exist`
        }
    },
    full_name: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    age: { type: Number, required: true }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual
PatientSchema.virtual('user', {
    ref: 'User',
    localField: 'user_id',
    foreignField: 'id',
    justOne: true
});

module.exports = mongoose.model('Patient', PatientSchema);
