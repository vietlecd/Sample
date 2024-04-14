const express = require('express');
const router = express.Router();

const teacherController = require('../../controllers/users/teacher.controller');
//const teacherdashController = require('../../controllers/users/teacherdashboard.controller');
const { body } = require('express-validator');
//const verifyUser = require('../../middlewares/varify.user');


// router.get('/login', teacherController.viewLogin);

// // view register route
// router.get('/register', teacherController.viewRegister);

//     // view forgot password route
// router.get('/forgot-password', teacherController.viewForgotPassword);

// // dashboard route
// router.get('/dashboard', teacherdashController.dashboard);

// router.get('/home', function(req, res) {
//     res.render('home');
// });

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

// forgot password route
router.post('/forgot-password', [
    body('email').isEmail().withMessage('Invalid email address'),
], teacherController.forgotPassword);

module.exports = router;