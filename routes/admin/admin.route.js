const express = require('express');
const { body } = require('express-validator');
const adminController = require('../../controllers/admin/admin.controller');

const router = express.Router();

router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required')
], adminController.login);

router.post('/addAdmin', [], adminController.addAdmin);
module.exports = router;
