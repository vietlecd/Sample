const Teacher = require('../../models/teacher.model');

// Get all teachers
const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.json(teachers);
    } catch (error) {
        res.json({ message: error });
    }
};

const addTeacher = async (req, res) => {
    try {
        const newTeacher = new Teacher({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            msgv: req.body.msgv,
            private_info: req.body.private_info,
            contact_info: req.body.contact_info
        });
        await newTeacher.save();
        res.status(201).json(newTeacher);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

const deleteTeacher = async (req, res) => {
    const { msgv } = req.params;

    try {
        const deletedTeacher = await Teacher.findOneAndDelete({ msgv: msgv });
        if (!deletedTeacher) {
            return res.status(404).json({ message: "Teacher not found." });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateTeacher = async (req, res) => {
    try {
        const teacherUpdated = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            msgv: req.body.msgv,
            private_info: req.body.private_info,
            contact_info: req.body.contact_info
        }

        const teacher = await Teacher.findOneAndUpdate({ msgv: req.params.msgv }, teacherUpdated, { new: true });

        if (!teacher) {
            return res.status(404).send();
        }

        res.json(teacher);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllTeachers,
    addTeacher,
    deleteTeacher, 
    updateTeacher
}