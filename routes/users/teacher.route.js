const express = require('express');
const router = express.Router();
const teacherController = require('../../controllers/users/teacher/teacher.controller');
const teacherDashboard = require('./teacherdashboard.route');
const { body } = require('express-validator');
const authenticate = require('../../middlewares/authenticate');


// login route
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
], teacherController.login);

router.use('/dashboard', authenticate, teacherDashboard);


module.exports = router;