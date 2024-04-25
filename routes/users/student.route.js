const express = require('express');
const router = express.Router();
const studentController = require('../../controllers/users/student/student.controller');
const studentDashboard = require('./studentdashboard.route');
const { body } = require('express-validator');
const authenticate = require('../../middlewares/authenticate');

// login route
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
], studentController.login);

router.use('/dashboard', authenticate, studentDashboard);



module.exports = router;