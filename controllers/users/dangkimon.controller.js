// Add a new course
const course = require('../../models/course.model');
const student = require('../../models/student.model')

const addCourse = async (req, res) => {
    // Logic to add a new course to the database
    try {
      const newCourse = new course({
        semester: req.body.semester,
        courseCode: req.body.courseCode,
        name: req.body.name,
        credit: req.body.credit,
        scheduleDay: req.body.scheduleDay,
        scheduleTime: req.body.scheduleTime,
        scheduleWeek: req.body.scheduleWeek,
        classroom: {
            room: req.body.classroom.room,
            building: req.body.classroom.building,
        },
        instructorName: req.body.instructorName,
        teacherCode: req.body.teacherCode,
        midterm:{
            examDay: req.body.midterm.examDay,
            examTime: req.body.midterm.examTime,
            room: req.body.midterm.room
        },
        final:{
            examDay: req.body.final.examDay,
            examTime: req.body.final.examTime,
            room: req.body.final.room
        }

     });
      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(400).send(error.message);
    }
};

//Add a course matching its code to a student
exports.addCoursetoStudent = async (req, res) => {
  const { mssv, courseCode, semester } = req.params;
  try {
      const course_match = await course.findOne({courseCode: courseCode, semester: semester}); 
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
      const update_filter = {$pull: {courseEnroll: {courseCode: courseCode, semester: semester}} };
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

module.exports = {
    addCourse
}