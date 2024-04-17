const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    semester: { type: String, required: true },
    courseCode: { type: String, required: true},
    credit: {type: String, required: true},
    scheduleDay: { type: String, required: true },
    scheduleTime: { type: String, required: true },
    scheduleWeek: {type: [Number]},
    classroom: { type: String, required: true },
    studentCount: { type: Number, required: true },
    instructorName: { type: String, required: true },
    midterm:{
        examDay: {type: String},
        examTime: {type: String},
        room: {type: String}
    },
    final:{
        examDay: {type: String, required: true},
        examTime: {type: String, required: true},
        room: {type: String, required: true}
    }
});

const courseModel = mongoose.model('course', courseSchema);
module.exports = courseModel;