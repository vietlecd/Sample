const mongoose = require('mongoose');
const courseSemesterSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: 'course',
        required: true
    },
    semester: {type: String, ref: 'course'},
    courseCode: {type: String, ref: 'course'},
    credit: {type: String, ref: 'course'},
    teacherName: {type: String, ref: 'course'},
    grade: {type: Number}
});

const courseSemesterModel = mongoose.model('courseSemester', courseSemesterSchema);
module.exports = courseSemesterModel;