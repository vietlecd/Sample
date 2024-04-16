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
        require: true,
        unique: true
    }
});

const teacherModel = mongoose.model('teacher', teacherSchema);
module.exports = teacherModel;