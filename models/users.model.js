const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role_id: {
        type: Number,
        required: true,
        ref: 'Role',
        validate: {
            validator: async function (v) {
                const Role = mongoose.model('Role');
                const role = await Role.findOne({ id: v });
                return !!role;
            },
            message: props => `Role with id ${props.value} does not exist`
        }
    },
    full_name: { type: String },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
    created_at: { type: Date, default: Date.now }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual to populate role details based on custom 'id'
UserSchema.virtual('role', {
    ref: 'Role',
    localField: 'role_id',
    foreignField: 'id',
    justOne: true
});

module.exports = mongoose.model('User', UserSchema);
