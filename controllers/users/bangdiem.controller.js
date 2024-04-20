const bangdiemModel = require('../../models/course.model');
const studentModel = require('../../models/student.model')

module.exports.dashboard = async (req, res) => {
    try {
        const bangdiem = await bangdiemModel .find();
        console.log(bangdiem);
        res.json(bangdiem); // send response to client
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error'); // send error response to client
    }
};

//View courses' grade of a student
exports.viewCourseGrade = async (req, res) => {
    const {mssv} = req.params;
    try {
        const stud = await studentModel.aggregate([
            {$match: {"mssv": mssv}},
            {$unwind: "$courseEnroll"},
            //{$match: {"courseEnroll.courseCode": courseCode, "courseEnroll.semseter": semester} },
            {$project: {"courseEnroll": 1, "_id": 0} }
        ]);
        if (!stud) {
          return res.status(404).send();
        }
        res.send(stud);
      } catch (e) {
        res.status(400).send(e);
      }
}