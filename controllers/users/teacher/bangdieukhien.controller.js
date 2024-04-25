const mongoose = require('mongoose')
const student = require('../../../models/student.model')
const course = require('../../../models/course.model')
const teacher = require('../../../models/teacher.model')
module.exports.dashboard = async (req, res) => {
    const {msgv} = req.params
    try {
        // Thực hiện các thao tác thành công ở đây
        const match_filter = {"teacherCode": msgv}
        const project_filter = {
            "instructorName": 0, 
            "teacherCode": 0, 
            "midterm": 0, 
            "final": 0
        }
        const cou = course.aggregate([
            {$match: match_filter},
            {$project: project_filter}
        ]);
        if (!cou) {
            return res.status(404).send();
          }
        res.send(cou);
    } catch (error) {
        // Xử lý lỗi khi có lỗi xảy ra
        res.send("Xin lỗi! Đây là dòng tin nhắn thất bại của bangdieukhien.");
    }
};


//View all student studying a course
module.exports.viewStudentEnrollCourse = async (req, res) => {
    const {courseCode, semester} = req.params;
    try {
      const find_filter = {"courseEnroll.courseCode": courseCode, "courseEnroll.semseter": semester}
      const courseRet = await student.find(find_filter);
      if (!courseRet) {
        return res.status(404).send();
      }
      res.send(courseRet);
    } catch (e) {
      res.status(400).send(e);
    }
}

//Count students studying a course
exports.countStudentEnrollCourse = async (req, res) => {
    const {courseCode, semester} = req.params;
    try {
      const find_filter = {"courseEnroll.courseCode": courseCode, "courseEnroll.semseter": semester}
      const group_filter = {
        _id: "$courseEnroll.courseCode",
        studentCount: {$sum: 1}
      }
      const courseRet = await student.aggregate([
        {$match: find_filter},
        {$unwind: "$courseEnroll"},
        {$group: group_filter}
      ]);
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
    const {mssv, courseCode, semester, lab, midterm, final} = req.params;
    try {
        const grade = {
            "lab": lab,
            "midterm": midterm,
            "final": final
        };
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