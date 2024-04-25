const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const dangkimonRoute = require('./dangkimon.route')

const thongtinSinhVien = require('../../controllers/users/student/thongtinsv.controller');
const thongtinDaoTao = require('../../controllers/users/student/thongtindt.controller');
const tkb = require('../../controllers/users/student/tkb.controller');
const bangdiem = require('../../controllers/users/student/bangdiem.controller');
const lichthi = require('../../controllers/users/student/lichthi.controller');
const dangkimonController = require('../../controllers/users/student/dangkimon.controller');
const khoahoc = require('../../controllers/users/student/khoahoc.controller');
router.get('/thongtinsinhvien', thongtinSinhVien.dashboard);
router.get('/thongtindaotao', thongtinDaoTao.getAllDaoTao);
router.get('/tkb', tkb.getAlltkb);
router.get('/tkb/:courseCode', tkb.gettkb);
router.get('/lichthi', lichthi.getAllLichThi);
router.get('/lichthi/:courseCode', lichthi.getLichThi);
router.get('/bangdiem', bangdiem.dashboard);
router.get('/khoahoc',khoahoc.dashboard);

router.use('/dangkimon', dangkimonRoute);



module.exports = router;