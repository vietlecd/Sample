const express = require('express');
const router = express.Router();

const thongtinSinhVien = require('../../controllers/users/thongtinsv.controller');
const thongtinDaoTao = require('../../controllers/users/thongtindt.controller');

router.use('/thongtinsinhvien',thongtinSinhVien.dashboard);
router.use('/thongtindaotao',thongtinDaoTao.dashboard);

module.exports = router;