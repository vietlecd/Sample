const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const adminModel = require('../../models/admin.model');

exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        const admin = await adminModel.findOne({ email: email });
        if (!admin) {
            return res.status(404).json({ message: "No admin record found" });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        const token = jwt.sign({ email: admin.email, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
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
        const admin = await adminModel.create({ name, email, password: hash });
        res.status(201).json({ message: "Admin registered successfully", admin: { id: admin._id, name: admin.name, email: admin.email } });
    } catch (err) {
        res.status(500).json({ message: "Error registering admin", error: err.message });
    }
};
