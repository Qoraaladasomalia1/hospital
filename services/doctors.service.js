const Doctor = require('../models/doctors.model');
const counterService = require('./counter.service');

const createDoctor = async (data) => {
    const id = await counterService.getNextSequence('doctorId');
    const doctor = new Doctor({ ...data, id });
    return await doctor.save();
};

const getAllDoctors = async () => {
    return await Doctor.find({}).populate('user').populate('department');
};

const getDoctorById = async (id) => {
    return await Doctor.findOne({ id: id }).populate('user').populate('department');
};

const getDoctorByUserId = async (userId) => {
    return await Doctor.findOne({ user_id: userId }).populate('user').populate('department');
};

const updateDoctor = async (id, data) => {
    return await Doctor.findOneAndUpdate({ id: id }, data, { new: true }).populate('user').populate('department');
};

const deleteDoctor = async (id) => {
    return await Doctor.findOneAndDelete({ id: id });
};

module.exports = {
    createDoctor,
    getAllDoctors,
    getDoctorById,
    getDoctorByUserId,
    updateDoctor,
    deleteDoctor
};
