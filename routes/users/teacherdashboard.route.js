const express = require('express');
const router = express.Router();
const thongtinGiangVien = require('../../controllers/users/thongtingv.controller');
const bangdieukhien = require('../../controllers/users/bangdieukhien.controller');
const khoahoc = require('../../controllers/users/khoahoc.controller');
const SinhVien = require('../../controllers/users/SinhVien.controller');
router.get('/thongtingiangvien',thongtinGiangVien.dashboard);
router.get('/bangdieukhien',bangdieukhien.getAllCourse);
router.get('/khoahoc',khoahoc.dashboard);
router.get('/SinhVien',SinhVien.dashboard);
router.get

module.exports = router;