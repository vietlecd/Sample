const tkbModel = require("../../models/course.model");


const getAlltkb = async (req, res) => {
    try {
        // Thực hiện các thao tác thành công ở đây
        res.send("Xin chào! Đây là dòng tin nhắn thành công của tkb.");
    } catch (error) {
        // Xử lý lỗi khi có lỗi xảy ra
        res.send("Xin lỗi! Đây là dòng tin nhắn thất bại của tkb.");
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

