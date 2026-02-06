const User = require('../models/users.model');
const Role = require('../models/roles.model');
const counterService = require('./counter.service');
const bcrypt = require('bcryptjs');

const createUser = async (userData) => {


    // Check if email already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
        throw new Error('Email already exists');
    }

    // Get next sequence ID
    const id = await counterService.getNextSequence('userId');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const user = new User({
        ...userData,
        id,
        password: hashedPassword
    });

    return await user.save();
};

const getAllUsers = async () => {
    return await User.find({}).select('-password').populate('role');
};

const getUserById = async (id) => {
    return await User.findOne({ id: id }).select('-password').populate('role');
};

const updateUser = async (id, updateData) => {


    if (updateData.password) {
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
    }
    return await User.findOneAndUpdate({ id: id }, updateData, { new: true }).select('-password').populate('role');
};

const deleteUser = async (id) => {
    return await User.findOneAndDelete({ id: id });
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};
