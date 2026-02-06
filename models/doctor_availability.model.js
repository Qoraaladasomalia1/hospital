const mongoose = require('mongoose');

const DoctorAvailabilitySchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    doctor_id: {
        type: Number,
        required: true,
        ref: 'Doctor',
        validate: {
            validator: async function (v) {
                const Doctor = mongoose.model('Doctor');
                const doctor = await Doctor.findOne({ id: v });
                return !!doctor;
            },
            message: props => `Doctor with id ${props.value} does not exist`
        }
    },
    day_of_week: {
        type: String,
        required: true,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    start_time: { type: String, required: true }, // Format HH:mm
    end_time: { type: String, required: true }   // Format HH:mm
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtual
DoctorAvailabilitySchema.virtual('doctor', {
    ref: 'Doctor',
    localField: 'doctor_id',
    foreignField: 'id',
    justOne: true
});

module.exports = mongoose.model('DoctorAvailability', DoctorAvailabilitySchema);
