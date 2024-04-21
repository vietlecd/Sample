const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    semester: { type: String, required: true },
    courseCode: { type: String, required: true},
    scheduleDay: { type: String, required: true },
    scheduleTime: { type: String, required: true },
    classroom: { type: String, required: true },
    studentCount: { type: Number, required: true },
    instructorName: { type: String, required: true }
});

const courseModel = mongoose.model('course', courseSchema);
module.exports = courseModel;