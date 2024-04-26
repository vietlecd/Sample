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

module.exports.updatePicture = async (req, res) => {
    const {msgv} = req.user
    try {
        const find_filter = {"msgv": msgv}
        const update_filter = {$set: {"image": req.body.image}}
        const thongtingiangvien = await thongtinGiangVien.updateOne(find_filter, update_filter);
        res.json(thongtingiangvien); // send response to client
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error'); // send error response to client
    }
};