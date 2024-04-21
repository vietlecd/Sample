const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const adminModel = require('../../models/admin.model');

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role } = req.body;
    try {
        const admin = await adminModel.findOne({ email: email });
        if (!admin || admin.role !== role) {
            return res.status(404).json({ message: "Invalid credentials or role" });
        }
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        const token = jwt.sign({ email: admin.email, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).json({ message: "Login successful", token: token });
    } catch (err) {
        res.status(500).json({ message: "Login error", error: err.message });
    }
};

const addAdmin = async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const admin = await adminModel.findOne({ email: email });
        if (admin) {
            return res.status(409).json({ message: "Admin already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newAdmin = new adminModel({
            email: email,
            password: hashedPassword,
            role: role
        });
        await newAdmin.save();
        res.status(201).json({ message: "Admin created successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Error creating admin", error: err.message });
    }
}

module.exports = {
    login,
    addAdmin
}

