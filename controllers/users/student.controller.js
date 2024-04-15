const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const teacherModel = require('../../models/teacher.model');

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const teacher = await teacherModel.findOne({ email: email });
        if (!teacher) {
            return res.status(404).json({ message: "No teacher record found" });
        }
        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        const token = jwt.sign({ email: teacher.email, role: teacher.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
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
        const teacher = await teacherModel.create({ name, email, password: hash });
        res.status(201).json({ message: "teacher registered successfully", teacher: { id: teacher._id, name: teacher.name, email: teacher.email } });
    } catch (err) {
        res.status(500).json({ message: "Error registering teacher", error: err.message });
    }
};