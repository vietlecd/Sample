const express = require('express');
const router = express.Router();
const thongtinGiangVien = require('../../controllers/users/teacher/thongtingv.controller');
const bangdieukhien = require('../../controllers/users/teacher/bangdieukhien.controller');
//const khoahoc = require('../../controllers/users/teacher/khoahoc.controller');
const SinhVien = require('../../controllers/users/teacher/SinhVien.controller');
router.use('/thongtingiangvien',thongtinGiangVien.dashboard);


router.get('/bangdieukhien', bangdieukhien.dashboard);
router.get('/bangdieukhien/:courseCode', bangdieukhien.viewStudentEnrollCourse);
router.put('/bangdieukhien/updateGrade', bangdieukhien.updateGradeforStudent)

//router.use('/khoahoc',khoahoc.dashboard);
router.use('/SinhVien',SinhVien.dashboard);

module.exports = router;