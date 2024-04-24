const studentModel = require('../../models/student.model')

module.exports.dashboard = async (req, res) => {
  const {mssv} = req.params;
    try {
        const stud = await studentModel.aggregate([
            {$match: {"mssv": mssv}},
            {$unwind: "$courseEnroll"},
            {$replaceRoot: {newRoot: "$courseEnroll"} }
        ]);
        //console.log(stud);
        res.json(stud);
        if (!stud) {
          return res.status(404).send();
        }
        res.send(stud);
      } catch (e) {
        res.status(400).send(e);
      }
};
