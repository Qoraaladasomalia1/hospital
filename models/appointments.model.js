const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    patient_id: {
        type: Number,
        required: true,
        ref: 'Patient',
        validate: {
            validator: async function (v) {
                const Patient = mongoose.model('Patient');
                const patient = await Patient.findOne({ id: v });
                return !!patient;
            },
            message: props => `Patient with id ${props.value} does not exist`
        }
    },
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
    appointment_date: { type: String, required: true }, // Format YYYY-MM-DD
    appointment_time: { type: String, required: true }, // Format HH:mm
    status: {
        type: String,
        enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'],
        default: 'PENDING'
    },
    created_at: { type: Date, default: Date.now }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtuals
AppointmentSchema.virtual('patient', {
    ref: 'Patient',
    localField: 'patient_id',
    foreignField: 'id',
    justOne: true
});

AppointmentSchema.virtual('doctor', {
    ref: 'Doctor',
    localField: 'doctor_id',
    foreignField: 'id',
    justOne: true
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
