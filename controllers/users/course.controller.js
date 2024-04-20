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

//Delete a courses of a semseter
exports.deleteCourse = async (req, res) => {
    const { mssv, courseCode, semester } = req.params;
    try {
        
        //Pull all courseEnroll OID matching one of the element in the array
        const find_filter = {mssv: mssv};
        const update_filter = {$pull: {courseEnroll: {courseCode: courseCode, semester: semester}} };
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

//View all courses' info which a student enrolled
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

