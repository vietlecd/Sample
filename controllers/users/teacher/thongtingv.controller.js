const thongtinGiangVien = require('../../../models/teacher.model');

module.exports.dashboard = async (req, res) => {
    const {msgv} = req.user
    try {
        const thongtingiangvien = await thongtinGiangVien.findOne({"msgv": msgv})
        .select({"password": 0});
        //console.log(thongtingiangvien);
        res.json(thongtingiangvien); // send response to client
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error'); // send error response to client
    }
};