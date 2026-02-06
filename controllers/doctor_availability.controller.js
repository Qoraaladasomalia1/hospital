const availabilityService = require('../services/doctor_availability.service');

const createAvailability = async (req, res) => {
    try {
        const availability = await availabilityService.createAvailability(req.body);
        res.status(201).json(availability);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllAvailabilities = async (req, res) => {
    try {
        const availabilities = await availabilityService.getAllAvailabilities();
        res.status(200).json(availabilities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAvailabilityById = async (req, res) => {
    try {
        const availability = await availabilityService.getAvailabilityById(req.params.id);
        if (!availability) {
            return res.status(404).json({ message: 'Availability not found' });
        }
        res.status(200).json(availability);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAvailabilityByDoctorId = async (req, res) => {
    try {
        const availabilities = await availabilityService.getAvailabilityByDoctorId(req.params.doctorId);
        res.status(200).json(availabilities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAvailability = async (req, res) => {
    try {
        const availability = await availabilityService.updateAvailability(req.params.id, req.body);
        if (!availability) {
            return res.status(404).json({ message: 'Availability not found' });
        }
        res.status(200).json(availability);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteAvailability = async (req, res) => {
    try {
        const availability = await availabilityService.deleteAvailability(req.params.id);
        if (!availability) {
            return res.status(404).json({ message: 'Availability not found' });
        }
        res.status(200).json({ message: 'Availability deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createAvailability,
    getAllAvailabilities,
    getAvailabilityById,
    getAvailabilityByDoctorId,
    updateAvailability,
    deleteAvailability
};
