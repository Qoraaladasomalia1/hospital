const Appointment = require('../models/appointments.model');
const DoctorAvailability = require('../models/doctor_availability.model');
const counterService = require('./counter.service');

/**
 * Validate if doctor has availability and if appointment time falls within available hours
 */
const validateDoctorAvailability = async (doctor_id, appointment_date, appointment_time) => {
    // 1. Check if doctor has any availability records
    const availabilities = await DoctorAvailability.find({ doctor_id });

    if (availabilities.length === 0) {
        throw new Error('Cannot book appointment: Doctor does not have availability schedule configured');
    }

    // 2. Get day of week from appointment_date (format: YYYY-MM-DD)
    const date = new Date(appointment_date);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });

    // 3. Find availability for the requested day
    const dayAvailability = availabilities.find(a => a.day_of_week === dayOfWeek);

    if (!dayAvailability) {
        const availableDays = availabilities.map(a => a.day_of_week).join(', ');
        throw new Error(`Cannot book appointment: Doctor is not available on ${dayOfWeek}. Available days: ${availableDays}`);
    }

    // 4. Check if appointment time is within available hours
    if (appointment_time < dayAvailability.start_time || appointment_time > dayAvailability.end_time) {
        throw new Error(`Cannot book appointment: Doctor is only available from ${dayAvailability.start_time} to ${dayAvailability.end_time} on ${dayOfWeek}`);
    }

    return true;
};

const createAppointment = async (data) => {
    // Validate doctor availability before creating appointment
    await validateDoctorAvailability(data.doctor_id, data.appointment_date, data.appointment_time);

    const id = await counterService.getNextSequence('appointmentId');
    const appointment = new Appointment({ ...data, id });
    return await appointment.save();
};

const getAllAppointments = async () => {
    return await Appointment.find({}).populate('patient').populate('doctor');
};

const getAppointmentById = async (id) => {
    return await Appointment.findOne({ id: id }).populate('patient').populate('doctor');
};

const getAppointmentsByDoctorId = async (doctorId) => {
    return await Appointment.find({ doctor_id: doctorId }).populate('patient');
};

const getAppointmentsByPatientId = async (patientId) => {
    return await Appointment.find({ patient_id: patientId }).populate('doctor');
};

const updateAppointment = async (id, data) => {
    // If updating doctor_id, appointment_date, or appointment_time, validate availability
    if (data.doctor_id || data.appointment_date || data.appointment_time) {
        const existingAppointment = await Appointment.findOne({ id: id });
        if (!existingAppointment) {
            throw new Error('Appointment not found');
        }

        const doctor_id = data.doctor_id || existingAppointment.doctor_id;
        const appointment_date = data.appointment_date || existingAppointment.appointment_date;
        const appointment_time = data.appointment_time || existingAppointment.appointment_time;

        await validateDoctorAvailability(doctor_id, appointment_date, appointment_time);
    }

    return await Appointment.findOneAndUpdate({ id: id }, data, { new: true }).populate('patient').populate('doctor');
};

const deleteAppointment = async (id) => {
    return await Appointment.findOneAndDelete({ id: id });
};

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentById,
    getAppointmentsByDoctorId,
    getAppointmentsByPatientId,
    updateAppointment,
    deleteAppointment
};
