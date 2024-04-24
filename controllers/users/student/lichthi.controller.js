const LichThi = require("../../../models/course.model");

// Get all lich thi
const getAllLichThi = async (req, res) => {
    try {
        const lichThi = await LichThi.find();
        if (!lichThi) {
            return res.status(404).json({ message: "Lich thi not found." });
        }
        const result = lichThi.map(lich => ({
            semester: lich.semester, 
            courseCode: lich.courseCode, 
            courseName: lich.courseName,
            midterm: lich.midterm,
            final: lich.final
        }));
        res.json(result);
    } catch (error) {
        res.json({ message: error });
    }
};

//Get info of a lich thi
const getLichThi = async (req, res) => {
    const { semester } = req.params;

    try {
        const lichThi = await LichThi.findOne({ 
            semester : semester 
        });
        if (!lichThi) {
            return res.status(404).json({ message: "Lich thi not found." });
        }
        res.json({ 
            semester: lichThi.semester, 
            courseCode: lichThi.courseCode, 
            courseName: lichThi.courseName,
            midterm: lichThi.midterm,
            final: lichThi.final
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getAllLichThi, getLichThi };