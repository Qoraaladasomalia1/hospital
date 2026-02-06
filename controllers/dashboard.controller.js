const User = require('../models/users.model');
const Department = require('../models/departments.model');
const Doctor = require('../models/doctors.model');
const Patient = require('../models/patients.model');
const Appointment = require('../models/appointments.model');

const getDashboardStats = async (req, res) => {
    try {
        // Get counts from database
        const [
            totalPatients,
            totalAppointments,
            totalDoctors,
            totalDepartments
        ] = await Promise.all([
            Patient.countDocuments(),
            Appointment.countDocuments(),
            Doctor.countDocuments(),
            Department.countDocuments()
        ]);

        // Get recent appointments
        const recentAppointments = await Appointment.find()
            .populate('patient')
            .populate('doctor')
            .sort({ created_at: -1 })
            .limit(5);

        const stats = {
            totalPatients,
            totalAppointments,
            totalDoctors,
            totalDepartments,
            recentActivity: recentAppointments.map(apt => ({
                title: 'Appointment ' + (apt.status || 'Scheduled').toLowerCase(),
                subtitle: `${apt.patient?.full_name || 'Unknown Patient'} with Dr. ${apt.doctor?.full_name || 'Unknown Doctor'}`,
                time: apt.created_at,
                type: 'appointment'
            }))
        };

        res.status(200).json(stats);
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getDashboardStats
};
