const student = require('../../../models/student.model')
const course = require('../../../models/course.model');

// Update lesson method
module.exports.updateLesson = async (req, res) => {
  try {
    const { courseCode } = req.params;
    const { content } = req.body; // New content for the lesson
    const files = req.files; // Uploaded files

    // Find the lesson by ID and update it with new content and files
    await course.findOneAndUpdate({ "courseCode": courseCode }, { content, files });

    res.status(200).json({ message: 'Lesson updated successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating lesson', error });
  }
};

//Update grade of a course for a student
module.exports.updateGradeforStudent = async (req, res) => {
  const { mssv, courseCode, lab, midterm, final } = req.body;
  try {
    const stu_find = { "mssv": mssv, "courseEnroll.courseCode": courseCode };
    const stu_update =
    {
      $set: {
        "courseEnroll.$.grade":
        {
          "lab": lab,
          "midterm": midterm,
          "final": final
        }
      }
    };
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