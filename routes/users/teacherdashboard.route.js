const express = require('express');
const router = express.Router();
const thongtinGiangVien = require('../../controllers/users/thongtingv.controller');
const bangdieukhien = require('../../controllers/users/bangdieukhien.controller');
const khoahoc = require('../../controllers/users/khoahoc.controller');
const SinhVien = require('../../controllers/users/SinhVien.controller');
router.use('/thongtingiangvien',thongtinGiangVien.dashboard);
router.use('/bangdieukhien',bangdieukhien.dashboard);
router.use('/khoahoc',khoahoc.dashboard);
router.use('/SinhVien',SinhVien.dashboard);

module.exports = router;