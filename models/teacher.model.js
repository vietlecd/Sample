const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: String, 
    email: String,
    password: String,
    role: {
        type: String,
        default: 'user'
    },
    deleted: Boolean,
    teacherProfile: {
        hoVaTenLot: String,
        ten: String,
        ngaySinh: Date,
        gioiTinh: String,
        khoa: String,
        maLop: String,
        diaChi: String,
        soDienThoai: String,
        emailTruongCap: String,
        namNhapHoc: String,
        thoiGianDaoTao: String,
        namHoc: String,
        nganhDaoTao: String
    }
});

const teacherModel = mongoose.model('teacher', teacherSchema);
module.exports = teacherModel;