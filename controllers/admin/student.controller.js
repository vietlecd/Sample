const Student = require('../../models/student.model');

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.json({ message: error });
    }
};