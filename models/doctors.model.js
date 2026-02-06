const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
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
    department_id: {
        type: Number,
        required: true,
        ref: 'Department',
        validate: {
            validator: async function (v) {
                const Department = mongoose.model('Department');
                const dept = await Department.findOne({ id: v });
                return !!dept;
            },
            message: props => `Department with id ${props.value} does not exist`
        }
    },
    full_name: { type: String, required: true },
    specialization: { type: String, required: true },
    consultation_fee: { type: Number, required: true }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtuals
DoctorSchema.virtual('user', {
    ref: 'User',
    localField: 'user_id',
    foreignField: 'id',
    justOne: true
});

DoctorSchema.virtual('department', {
    ref: 'Department',
    localField: 'department_id',
    foreignField: 'id',
    justOne: true
});

module.exports = mongoose.model('Doctor', DoctorSchema);
