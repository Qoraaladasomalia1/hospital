const Department = require('../models/departments.model');
const counterService = require('./counter.service');

const createDepartment = async (data) => {
    const id = await counterService.getNextSequence('departmentId');
    const department = new Department({ ...data, id });
    return await department.save();
};

const getAllDepartments = async () => {
    return await Department.find({});
};

const getDepartmentById = async (id) => {
    return await Department.findOne({ id: id });
};

const updateDepartment = async (id, data) => {
    return await Department.findOneAndUpdate({ id: id }, data, { new: true });
};

const deleteDepartment = async (id) => {
    return await Department.findOneAndDelete({ id: id });
};

module.exports = {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment
};
