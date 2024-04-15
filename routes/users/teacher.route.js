const express = require('express');
const router = express.Router();
const teacherController = require('../../controllers/users/teacher.controller');
const teacherDashboard = require('./teacherdashboard.route');
const { body } = require('express-validator');
const verifyUser = require('../../middlewares/verify.user');

// register route
router.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
], teacherController.register);

// login route
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required'),
], teacherController.login);

router.use('/dashboard', teacherDashboard);


module.exports = router;