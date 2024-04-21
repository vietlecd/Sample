const Student = require('../../models/student.model');

// Get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.json({ message: error });
    }
};

// Add a new student
const addStudent = async (req, res) => {
    try {
      const newStudent = new Student({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          mssv: req.body.mssv, 
          private_info: req.body.private_info,
          training_info: req.body.training_info
     });
      await newStudent.save();
      res.status(201).json(newStudent);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

// Delete a student
const deleteStudent = async (req, res) => {
    const { mssv } = req.params;

    try {
        const deletedStudent = await Student.findOneAndDelete({ mssv: mssv });
        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found." });
        }

        res.status(200).json({ message: "Student deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an existing student
const updateStudent = async (req, res) => {
    try {
        const studentUpdated = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            mssv: req.body.mssv,
            private_info: req.body.private_info,
            training_info: req.body.training_info
        }

        const student = await Student.findOneAndUpdate({ mssv: req.params.mssv }, studentUpdated, { new: true });

        if (!student) {
            return res.status(404).send();
        }

        res.send(student);
    } catch (e) {
        res.status(400).send(e);
    }
};

// Find a student by mssv
const findStudentByMssv = async (req, res) => {
    const { mssv } = req.params;

    try {
        const student = await Student.findOne({ mssv: mssv });
        if (!student) {
            return res.status(404).json({ message: "Student not found." });
        }

        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllStudents,
    addStudent,
    deleteStudent,
    updateStudent,
    findStudentByMssv
}


