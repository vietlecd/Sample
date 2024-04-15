const thongDaoTao = require('../../models/teacher.model');


module.exports.dashboard = async (req, res) => {
    const thongtindaotao = await thongDaoTao.find({
        deleted: false 
    });
    console.log( thongtindaotao);
};
