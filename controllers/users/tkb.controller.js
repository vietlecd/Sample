const tkbModel = require("../../models/course.model");


const getAlltkb = async (req, res) => {
    try {
        const tkb = await tkbModel.find();
        res.json(tkb);
    } catch (error) {
        res.json({ message: error });
    }
};


const gettkb = async (req, res) => {
    const { courseCode } = req.params;

    try {
        const tkb = await tkbModel.findOne({ 
            courseCode: courseCode 
        });
        if (!tkb) {
            return res.status(404).json({ message: "Thoi khoa bieu not found." });
        }
        res.json({ semester: tkb.semester, 
            courseCode: tkb.courseCode, 
            scheduleDay: tkb.scheduleDay,
            scheduleTime: tkb.scheduleTime,
            courseName: tkb.courseName,
            sotinchi: tkb.sotinchi,
            classroom:tkb.classroom,
            scheduleWeek: tkb.scheduleWeek,
            tchocphi:tkb.tchocphi
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAlltkb, gettkb };