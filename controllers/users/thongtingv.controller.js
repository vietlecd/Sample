const thongtinGiangVien = require('../../models/teacher.model');

module.exports.dashboard = async (req, res) => {
    try {
        const thongtingiangvien = await thongtinGiangVien.find();
        console.log(thongtingiangvien);
        res.json(thongtingiangvien); // send response to client
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error'); // send error response to client
    }
};