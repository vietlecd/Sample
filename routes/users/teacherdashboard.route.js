const express = require('express');
const router = express.Router();
const thongtinGiangVien = require('../../controllers/users/thongtingv.controller');
const bangdieukhien = require('../../controllers/users/bangdieukhien.controller');

router.use('/thongtingiangvien',thongtinGiangVien.dashboard);
router.use('/bangdieukhien',bangdieukhien.dashboard);
module.exports = router;