const express = require('express');
const { body } = require('express-validator');
const adminController = require('../../controllers/admin/admin.controller');

const router = express.Router();

router.post('/', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required')
], adminController.login);

router.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], adminController.register);

module.exports = router;
