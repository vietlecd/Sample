const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const studentModel = require('../../models/student.model');

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const student = await studentModel.findOne({ email: email });
        if (!student) {
            return res.status(404).json({ message: "No student record found" });
        }
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        const token = jwt.sign({ email: student.email, role: student.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ message: "Login successful", token: token });
    } catch (err) {
        res.status(500).json({ message: "Login error", error: err.message });
    }
};

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const student = await studentModel.create({ name, email, password: hash });
        res.status(201).json({ message: "student registered successfully", student: { id: student._id, name: student.name, email: student.email } });
    } catch (err) {
        res.status(500).json({ message: "Error registering student", error: err.message });
    }
};