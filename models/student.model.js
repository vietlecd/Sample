const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: String, 
    email: String,
    password: String,
    role: {
        type: String,
        default: 'user'
    },
    deleted: Boolean,
    studentProfile: {
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

const studentModel = mongoose.model('student', studentSchema);
module.exports = studentModel;
