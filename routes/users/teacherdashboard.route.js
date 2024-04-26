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

const multer = require('multer');
const path = require('path'); //Upload image
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/')  // Store files in the 'uploads' folder
    },
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-gv-' + Date.now() + path.extname(file.originalname))  // Create a unique file name
    }
});
const upload = multer({ storage: storage });
router.post('/thongtingiangvien/changePic', upload.single('image'), thongtinGiangVien.updatePicture);

module.exports = router;