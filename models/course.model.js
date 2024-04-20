const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseCode: { type: String, required: false},
    scheduleDay: { type: String, required: false },
    scheduleTime: { type: String, required: false },
    classroom: { type: String, required: false },
    courseName: { type: String, required: false },
    TinChi: { type: Number, required: false },
    TCHocPhi: { type: Number, required: false },
    semesterNum: { type: Number, required: false },
    startYear: { type: Number, required: false },
    diemSo:{type: Number, required: false },
    diemChu:{type: Number, required: false },
    graduationYear: {
        type: Number,
        required: false,
        default: function() {
            // Ensure this logic runs only if startYear is available
            return this.startYear ? this.startYear + 4 : undefined;
        }
    }

});

const courseModel = mongoose.model('course', courseSchema);
module.exports = courseModel;