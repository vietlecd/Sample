const express = require('express');
const router = express.Router();
//const userController = require('../../controllers/users/user.controller');
const studentController = require('../../controllers/users/student.controller');
const { body } = require('express-validator');
const verifyUser = require('../../middlewares/varify.user');
const dashboardRoute = require('../../controllers/users/studentdashboard.controller')

router.get('/login', studentController.viewLogin);

// view register route
router.get('/register', studentController.viewRegister);

    // view forgot password route
router.get('/forgot-password', studentController.viewForgotPassword);

router.get('/dashboard', dashboardRoute.dashboard);
router.get('/home', function(req, res) {
    res.render('home');
});
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

// forgot password route
router.post('/forgot-password', [
    body('email').isEmail().withMessage('Invalid email address'),
], studentController.forgotPassword);

module.exports = router;