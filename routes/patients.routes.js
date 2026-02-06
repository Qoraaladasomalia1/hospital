const express = require('express');
const router = express.Router();
const patientsController = require('../controllers/patients.controller');

router.post('/', patientsController.createPatient);
router.get('/', patientsController.getAllPatients);
router.get('/:id', patientsController.getPatientById);
router.put('/:id', patientsController.updatePatient);
router.delete('/:id', patientsController.deletePatient);

module.exports = router;
