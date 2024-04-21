const LichThi = require("../../models/course.model");

// Get all lich thi
const getAllLichThi = async (req, res) => {
    try {
        const lichThi = await LichThi.find();
        res.json(lichThi);
    } catch (error) {
        res.json({ message: error });
    }
};

//Get info of a lich thi
const getLichThi = async (req, res) => {
    const { courseCode } = req.params;

    try {
        const lichThi = await LichThi.findOne({ courseCode: courseCode });
        if (!lichThi) {
            return res.status(404).json({ message: "Lich thi not found." });
        }
        res.json({ semester: lichThi.semester, courseCode: lichThi.courseCode, scheduleDay: lichThi.scheduleDay });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllLichThi, getLichThi };