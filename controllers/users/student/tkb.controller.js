const tkbModel = require("../../../models/course.model");

// Get all lich thi
const getAlltkb = async (req, res) => {
    try {
        const tkb = await tkbModel.find().select('semester courseCode courseName scheduleDay scheduleWeek scheduleTime');
        res.json(tkb);
    } catch (error) {
        res.json({ message: error });
    }
};

//Get info of a lich thi
const gettkb = async (req, res) => {
    const { semster } = req.params;

    try {
        const tkb = await tkbModel.findOne({ 
            semster: semster
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

module.exports = { getAlltkb, gettkb };