const Patient = require('../models/patients.model');
const counterService = require('./counter.service');

const createPatient = async (data) => {
    const id = await counterService.getNextSequence('patientId');
    const patient = new Patient({ ...data, id });
    return await patient.save();
};

const getAllPatients = async () => {
    return await Patient.find({}).populate('user');
};

const getPatientById = async (id) => {
    return await Patient.findOne({ id: id }).populate('user');
};

const getPatientByUserId = async (userId) => {
    return await Patient.findOne({ user_id: userId }).populate('user');
};

const updatePatient = async (id, data) => {
    return await Patient.findOneAndUpdate({ id: id }, data, { new: true }).populate('user');
};

const deletePatient = async (id) => {
    return await Patient.findOneAndDelete({ id: id });
};

module.exports = {
    createPatient,
    getAllPatients,
    getPatientById,
    getPatientByUserId,
    updatePatient,
    deletePatient
};
