const express = require('express');
const router = express.Router();

const thongtinSinhVien = require('../../controllers/users/thongtinsv.controller');
const thongtinDaoTao = require('../../controllers/users/thongtindt.controller');

const tkb = require('../../controllers/users/tkb.controller');
const bangdiem = require('../../controllers/users/bangdiem.controller');
const lichthi = require('../../controllers/users/lichthi.controller');
router.use('/thongtinsinhvien',thongtinSinhVien.dashboard);
router.use('/thongtindaotao',thongtinDaoTao.dashboard);

router.use('/tkb',tkb.dashboard);
router.use('/lichthi',lichthi.dashboard);
router.use('/bangdiem',bangdiem.dashboard);
module.exports = router;