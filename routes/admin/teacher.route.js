const express = require('express');

const router = express.Router();

const teacherController = require('../../controllers/admin/teacher.controller');

router.use('/', teacherController.getAllTeachers);
module.exports = router;