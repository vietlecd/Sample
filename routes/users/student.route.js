const express = require('express');
const router = express.Router();
const studentController = require('../../controllers/users/student.controller');
const studentDashboard = require('./studentdashboard.route');
const { body } = require('express-validator');

// register route
router.post('/changePassword', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], studentController.changePassword);

// login route
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
], studentController.login);

router.use('/dashboard', studentDashboard);


module.exports = router;