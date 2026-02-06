const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointments.controller');

router.post('/', appointmentsController.createAppointment);
router.get('/', appointmentsController.getAllAppointments);
router.get('/:id', appointmentsController.getAppointmentById);
router.get('/doctor/:doctorId', appointmentsController.getAppointmentsByDoctorId);
router.get('/patient/:patientId', appointmentsController.getAppointmentsByPatientId);
router.put('/:id', appointmentsController.updateAppointment);
router.delete('/:id', appointmentsController.deleteAppointment);

module.exports = router;
