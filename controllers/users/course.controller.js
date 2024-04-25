const courseModel = require('../../models/course.model.js');
const student = require('../../models/student.model.js');
const teacher = require('../../models/teacher.model.js');
const courseRegister = require('../../models/courseRegister.model.js')

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

//Add a course by its oid to a student
//Note: when passing course's object id as course_oid_string, set the object id to be string
exports.addCoursetoStudentbyOID = async (req, res) => {
    const { mssv, course_oid_string } = req.params;
    try {
        const st = await student.findOne({mssv: mssv});
        const ce = st.courseEnroll;
        const courseRet = ce.push(new mongoose.Types.ObjectId(course_oid_string));
        st.save();
        if (!courseRet) {
          return res.status(404).send();
        }
        res.send(courseRet);
      } catch (e) {
        res.status(400).send(e);
    }
}

//Add a course matching its code to a student
exports.addCoursetoStudentbyCode = async (req, res) => {
    const { mssv, courseCode } = req.params;
    try {
        const find_filter = {mssv: mssv};
        const course_match = await courseModel.findOne({courseCode: courseCode}); 
        const update_filter = {$push: {courseEnroll: course_match._id} };
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

//Delete a course by its object id
exports.deleteCoursebyOID = async (req, res) => {
    const { mssv, course_oid_string } = req.params;
    try {
        const find_filter = {mssv: mssv};
        const update_filter = {$pull: {courseEnroll: new mongoose.Types.ObjectId(course_oid_string)} };
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

//Delete all courses matching a certain course code
exports.deleteCoursebyCode = async (req, res) => {
    const { mssv, courseCode } = req.params;
    try {
        const find_filter = {mssv: mssv};
        //Return an array of course's ObjectID with inputed courseCode
        const coid_with_code = await courseModel.find({courseCode: courseCode}).select('_id'); 
        //Pull all courseEnroll OID matching one of the element in the array
        const update_filter = {$pull: {courseEnroll: {$in: coid_with_code}} };
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

//View all courses' info which a student enrolled
exports.viewCourseByMSSV = async (req, res) => {
    const { mssv } = req.params;
    try {
        const st = await student.findOne({ mssv: mssv });
        const ce = st.courseEnroll;
        const courseRet = await course.find({_id: { $in: ce}});
        if (!courseRet) {
          return res.status(404).send();
        }
        res.send(courseRet);
      } catch (e) {
        res.status(400).send(e);
    }
};

