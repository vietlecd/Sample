const bangdiemModel = require("../../../models/course.model");

const getbangdiem = async (req, res) => {
    const { semester } = req.params;

    try {
        const bangdiem = await bangdiemModel .findOne({ 
            semester : semester
        });
        if (!bangdiem) {
            return res.status(404).json({ message: "Bang diem not found." });
        }
        res.json({ semester: bangdiem.semester, 
            courseCode: bangdiem.courseCode, 
            courseName: bangdiem.courseName,
            bangdiem: bangdiem.bangdiem
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { getbangdiem };