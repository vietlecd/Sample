const thongSinhVien = require('../../models/student.model');

module.exports.dashboard = async (req, res) => {
    try {
        const thongtinsinhvien = await thongSinhVien.find();
        console.log(thongtinsinhvien);
        res.json(thongtinsinhvien); // send response to client
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error'); // send error response to client
    }
};