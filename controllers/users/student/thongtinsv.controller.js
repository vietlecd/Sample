const thongSinhVien = require('../../../models/student.model');

module.exports.dashboard = async (req, res) => {
  const {mssv} = req.user; 
  try {
        const thongtinsinhvien = await thongSinhVien.find({
          "mssv": mssv
        });
        res.json(thongtinsinhvien); // send response to client
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error'); // send error response to client
    }
};
