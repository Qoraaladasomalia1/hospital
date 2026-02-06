const DoctorAvailability = require('../models/doctor_availability.model');
const counterService = require('./counter.service');

const createAvailability = async (data) => {
    const id = await counterService.getNextSequence('availabilityId');
    const availability = new DoctorAvailability({ ...data, id });
    return await availability.save();
};

const getAllAvailabilities = async () => {
    return await DoctorAvailability.find({}).populate('doctor');
};

const getAvailabilityById = async (id) => {
    return await DoctorAvailability.findOne({ id: id }).populate('doctor');
};

const getAvailabilityByDoctorId = async (doctorId) => {
    return await DoctorAvailability.find({ doctor_id: doctorId }).populate('doctor');
};

const updateAvailability = async (id, data) => {
    return await DoctorAvailability.findOneAndUpdate({ id: id }, data, { new: true }).populate('doctor');
};

const deleteAvailability = async (id) => {
    return await DoctorAvailability.findOneAndDelete({ id: id });
};

module.exports = {
    createAvailability,
    getAllAvailabilities,
    getAvailabilityById,
    getAvailabilityByDoctorId,
    updateAvailability,
    deleteAvailability
};
