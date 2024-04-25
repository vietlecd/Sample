const tkbModel = require("../../../models/course.model");

//Get info of a lich thi
const gettkb = async (req, res) => {
    const { semster } = req.body;
    const { mssv } = req.user;
    try {
        const tkb = await tkbModel.findOne({ 
            semster: semster,
            mssv: mssv
        });
        if (!tkb) {
            return res.status(404).json({ message: "Thoi khoa bieu not found." });
        }
        res.json({ 
            semester: tkb.semester, 
            courseCode: tkb.courseCode, 
            scheduleDay: tkb.scheduleDay,
            scheduleTime: tkb.scheduleTime,
            courseName: tkb.courseName,
            sotinhchi: tkb.sotinhchi,
            classroom:tkb.classroom,
            scheduleWeek: tkb.scheduleWeek,
            tinhchihocphi:tkb.tinhchihocphi
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { gettkb };