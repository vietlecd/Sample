const express = require('express');

const router = express.Router();

// Create the upload middleware

const bangdieukhienController = require('../../controllers/users/teacher/bangdieukhien.controller');
const khoahocRoute = require('./khoahoc.route')

router.get('/', bangdieukhienController.dashboard);
router.get('/:courseCode', bangdieukhienController.viewStudentEnrollCourse);
//router.put('/updateGrade', bangdieukhienController.updateGradeforStudent)
router.use('/khoahoc', khoahocRoute)

module.exports = router;