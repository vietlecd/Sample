module.exports.dashboard = (req, res) => {
    try {
        // Thực hiện các thao tác thành công ở đây
        res.send("Xin chào! Đây là dòng tin nhắn thành công của bangdieukhien.");
    } catch (error) {
        // Xử lý lỗi khi có lỗi xảy ra
        res.send("Xin lỗi! Đây là dòng tin nhắn thất bại của bangdieukhien.");
    }
};

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

