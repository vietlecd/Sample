const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    semester: { type: String, required: true },
    courseCode: { type: String, unique: true, required: true},
    name: {type: String, required: true},
    credit: {type: String, required: true},
    scheduleDay: { type: String, required: true },
    scheduleTime: { type: String, required: true },
    scheduleWeek: {type: [Number]},
    classroom: {
        room: {type: String, required: true},
        building: {type: String, required: true},
    },
    instructorName: { type: String, required: true },
    teacherCode: {type: String, required: true },
    midterm:{
        examDay: {type: String},
        examTime: {type: String},
        room: {type: String}
    },
    final:{
        examDay: {type: String},
        examTime: {type: String},
        room: {type: String}
    }
});



const courseModel = mongoose.model('course', courseSchema);
module.exports = courseModel;