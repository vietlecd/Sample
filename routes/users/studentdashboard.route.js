const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const thongtinSinhVien = require('../../controllers/users/thongtinsv.controller');
const thongtinDaoTao = require('../../controllers/users/thongtindt.controller');
const tkb = require('../../controllers/users/tkb.controller');
const bangdiem = require('../../controllers/users/bangdiem.controller');
const lichthi = require('../../controllers/users/lichthi.controller');
const dangkimonController = require('../../controllers/users/dangkimon.controller');
const khoahoc = require('../../controllers/users/khoahoc.controller');
router.get('/thongtinsinhvien', thongtinSinhVien.dashboard);
router.get('/thongtindaotao', thongtinDaoTao.dashboard);
router.get('/tkb', tkb.getAlltkb);
router.get('/tkb/:courseCode', tkb.gettkb);
router.get('/lichthi', lichthi.getAllLichThi);
router.get('/lichthi/:courseCode', lichthi.getLichThi);
router.get('/bangdiem', bangdiem.dashboard);
router.get('/khoahoc',khoahoc.dashboard);

// POST route for course registration
router.post('/dangkimon', dangkimonController.addCourse);

module.exports = router;