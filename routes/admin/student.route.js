const express = require('express');

const router = express.Router();

const studentController = require('../../controllers/admin/student.controller');


router.use('/', studentController.getAllStudents);
module.exports = router;