const Teacher = require('../../models/teacher.model');

// Get all teachers
exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (error) {
        res.json({ message: error });
    }
};