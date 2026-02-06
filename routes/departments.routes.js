const express = require('express');
const router = express.Router();
const departmentsController = require('../controllers/departments.controller');

router.post('/', departmentsController.createDepartment);
router.get('/', departmentsController.getAllDepartments);
router.get('/:id', departmentsController.getDepartmentById);
router.put('/:id', departmentsController.updateDepartment);
router.delete('/:id', departmentsController.deleteDepartment);

module.exports = router;
