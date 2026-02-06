const express = require('express');
const router = express.Router();
const doctorsController = require('../controllers/doctors.controller');

router.post('/', doctorsController.createDoctor);
router.get('/', doctorsController.getAllDoctors);
router.get('/:id', doctorsController.getDoctorById);
router.put('/:id', doctorsController.updateDoctor);
router.delete('/:id', doctorsController.deleteDoctor);

module.exports = router;
