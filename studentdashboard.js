const express = require('express');
const router = express.Router();
const studentController = require('../../controllers/users/student.controller');
const { body } = require('express-validator');
const verifyUser = require('../../middlewares/verify.user')
const dashboardRoute = require('../../controllers/users/studentdashboard.controller');
const detailSinhVien = require('./users/detailSinhVien.route');
const thongtinSinhVien = require('../../controllers/users/thongtinSinhVien.controller');
const thongtinDaoTao = require('../../controllers/users/thongtinDaoTao.controller');
router.get('/detailSinhVien',thongtinSinhVien.dashboard);
router.get('/detailDaoTao',thongtinDaoTao.dashboard);

module.exports = router;