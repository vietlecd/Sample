const express = require('express');

const router = express.Router();

const studentController = require('../../controllers/admin/student.controller');


router.get('/', studentController.getAllStudents);
router.post('/add', studentController.addStudent);
router.put('/:mssv', studentController.updateStudent);
router.delete('/:mssv', studentController.deleteStudent);
router.get('/:mssv', studentController.findStudentByMssv);

module.exports = router;