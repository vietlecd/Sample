const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: String, 
    email: String,
    password: {
        type: String,
        default: '123456'
    },
    msgv: {
        type: String,
        require: false,
    },
    role: {
        type: String,
        default: 'teacher'
    },
    passwordChanged: {
        type: Boolean,
        default: false
    },

    private_info: {
        ngaySinh: Date, 
        gioiTinh: String,
        soCCCD: Number,
        ngaycapCCCD: Date,
        noicapCCCD: String,
        bangcap: String,
    },
    contact_info: {
        diachi: String, 
        sodienthoai: Number,
        emailtruongcap: String,
        emaillienlac: String 
    }},
    { 
        timestamps: true // Enable createdAt and updatedAt fields
    }

);

const teacherModel = mongoose.model('teacher', teacherSchema);
module.exports = teacherModel;