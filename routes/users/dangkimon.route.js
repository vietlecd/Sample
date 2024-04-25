const express = require('express');

const router = express.Router();

const dangkimonController = require('../../controllers/users/student/dangkimon.controller');


router.get('/', dangkimonController.viewAvailableCourse)
router.put('/reg', dangkimonController.addCourseReg)
router.put('/confirmReg', dangkimonController.confirmReg)
router.delete('/delOne', dangkimonController.deleteCourseReg)
router.delete('/delAll', dangkimonController.deleteAllCourseReg)


module.exports = router;