const courseModel = require('../../models/course.model.js');
const student = require('../../models/student.model.js');
const teacher = require('../../models/teacher.model.js');
const courseRegister = require('../../models/courseInSemester.model.js')

module.exports.dashboard = (req, res) => {
    try {
        // Thực hiện các thao tác thành công ở đây
        const course = courseModel.find();
        console.log(course);
        res.send("Xin chào! Đây là dòng tin nhắn thành công của course.");
    } catch (error) {
        // Xử lý lỗi khi có lỗi xảy ra
        res.send("Xin lỗi! Đây là dòng tin nhắn thất bại của course.");
    }
};


//Add a course matching its code to a student
exports.addCoursetoStudent = async (req, res) => {
    const { mssv, courseCode, semester } = req.params;
    try {
        const course_match = await courseModel.findOne({courseCode: courseCode, semester: semester}); 
        const newCouSem = {
            courseId: course_match._id,
            semester: course_match.semester,
            courseCode: course_match.courseCode
        }
        const find_filter = {mssv: mssv};
        const update_filter = {$push: {courseEnroll: newCouSem} };
        const option = {};
        const courseRet = await student.updateOne(find_filter, update_filter, option);
        if (!courseRet) {
          return res.status(404).send();
        }
        res.send(courseRet);
      } catch (e) {
        res.status(400).send(e);
    }
}

//Delete a courses enrolled by a student
exports.deleteCoursefromStudent = async (req, res) => {
    const { mssv, courseCode, semester } = req.params;
    try {
        const find_filter = {mssv: mssv};
        const update_filter = {$pull: {"courseEnroll": {"courseCode": courseCode, semester: semester}} };
        const option = {};
        const courseRet = await student.updateMany(find_filter, update_filter, option);
        if (!courseRet) {
          return res.status(404).send();
        }
        res.send(courseRet);
      } catch (e) {
        res.status(400).send(e);
    }
}

//View all courses in which a student enrolled
exports.viewCourseByMSSV = async (req, res) => {
    const { mssv } = req.params;
    try {
        const st = await student.findOne({ mssv: mssv });
        const courseRet = st.courseEnroll;
        if (!courseRet) {
          return res.status(404).send();
        }
        res.send(courseRet);
      } catch (e) {
        res.status(400).send(e);
    }
};

//View a course's description
exports.viewCourseDescription = async (req, res) => {
    const {courseCode, semester} = req.params;
    try {
      const find_filter = {"courseCode": courseCode, "semseter": semester}
      const courseRet = await course.findOne(find_filter);
      if (!courseRet) {
        return res.status(404).send();
      }
      res.send(courseRet);
    } catch (e) {
      res.status(400).send(e);
  }
}

//View a teacher's all teaching courses
exports.viewCoursebyMSGV = async (req, res) => {
  const { msgv } = req.params;
  try {
      const tea = await course.find({"msgv": msgv });
      if (!tea) {
        return res.status(404).send();
      }
      res.send(tea);
    } catch (e) {
      res.status(400).send(e);
  }
};

//View all student studying a course
exports.viewStudentEnrollCourse = async (req, res) => {
  const {courseCode, semester} = req.params;
  try {
    const find_filter = {"courseEnroll.courseCode": courseCode, "courseEnroll.semseter": semester}
    const courseRet = await course.findOne(find_filter);
    if (!courseRet) {
      return res.status(404).send();
    }
    res.send(courseRet);
  } catch (e) {
    res.status(400).send(e);
  }
}

//Update grade of a course for a student
exports.updateGradeforStudent = async (req, res) => {
  const {mssv, courseCode, semester, grade} = req.params;
  try {
    const stu_find = {"mssv": mssv, "courseEnroll.courseCode": courseCode, "courseEnroll.semseter": semester};
    const stu_update = {$set: {"courseEnroll.$.grade": grade}}
    const stu_option = {};
    const courseRet = await student.updateOne(stu_find, stu_update, stu_option);
    if (!courseRet) {
      return res.status(404).send();
    }
    res.send(courseRet);
  } catch (e) {
    res.status(400).send(e);
  }
}
