const express = require('express');

const router = express.Router();

const multer = require('multer');
const path = require('path'); //Upload image
// Set up storage for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'lesson_uploads/') // Store lesson files in 'lesson_uploads' folder
  },
  filename: function(req, file, cb) {
    // Append the upload date and the original file extension to the original name
    cb(null, file.originalname.split('.')[0] + '-' + Date.now() + path.extname(file.originalname))
  }
});

// Create the upload middleware
const upload = multer({ storage: storage });

const khoahocController = require('../../controllers/users/teacher/khoahoc.controller')

router.put('/updateGrade', khoahocController.updateGradeforStudent);
router.post('/:courseCode', upload.single('lessonFile'), khoahocController.updateLesson);


module.exports = router;