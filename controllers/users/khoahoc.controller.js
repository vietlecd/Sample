const course = require('../../models/course.model')
const student = require('../../models/student.model')

module.exports.dashboard = (req, res) => {
    try {
        // Thực hiện các thao tác thành công ở đây
        res.send("Xin chào! Đây là dòng tin nhắn thành công của khoa hoc.");
    } catch (error) {
        // Xử lý lỗi khi có lỗi xảy ra
        res.send("Xin lỗi! Đây là dòng tin nhắn thất bại của tôi.");
    }
};

//View all courses in which a student enrolled
exports.viewCourseByMSSV = async (req, res) => {
    const { mssv } = req.params;
    try {
        const st = await student.findOne({ "mssv": mssv }).lean();
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