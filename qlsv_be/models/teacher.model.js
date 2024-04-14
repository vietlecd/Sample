const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: String, 
    email: String,
    password: String,
    role: {
        type: String,
        default: 'user'
    },
    maSoGiangVien: String,
    hoVaTenLot: String,
    ten: String,
    ngaySinh: Date,
    gioiTinh: String,
    khoa: String,
    maLop: String,
    diaChi: String,
    soDienThoai: String,
    emailTruongCap: String,
    namHoc: String,
    nganhGiangDay: String,
    deleted: Boolean
});

const teacherModel = mongoose.model('teacher', teacherSchema);
module.exports = teacherModel;