const express = require('express');
const router = express.Router();
const availabilityController = require('../controllers/doctor_availability.controller');

router.post('/', availabilityController.createAvailability);
router.get('/', availabilityController.getAllAvailabilities);
router.get('/:id', availabilityController.getAvailabilityById);
router.get('/doctor/:doctorId', availabilityController.getAvailabilityByDoctorId);
router.put('/:id', availabilityController.updateAvailability);
router.delete('/:id', availabilityController.deleteAvailability);

module.exports = router;
