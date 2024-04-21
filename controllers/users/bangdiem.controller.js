const bangdiemModel = require('../../models/course.model');
const studentModel = require('../../models/student.model')

module.exports.dashboard = async (req, res) => {
  const {mssv} = req.params  
  try {
        const bangdiem = await this.viewCourseGrade(req, res);
        console.log(res);
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
            {$replaceRoot: {newRoot: "$courseEnroll"} }
        ]);
        console.log(stud);
        res.json(stud);
        if (!stud) {
          return res.status(404).send();
        }
        res.send(stud);
      } catch (e) {
        res.status(400).send(e);
      }
}