const express = require('express');
const router = express.Router();
const studentController = require('../../controllers/users/student.controller');
const studentDashboard = require('./studentdashboard.route');
const { body } = require('express-validator');
const verifyUser = require('../../middlewares/verify.user');

// register route
router.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], studentController.register);

// login route
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
], studentController.login);

router.use('/dashboard', studentDashboard);


module.exports = router;