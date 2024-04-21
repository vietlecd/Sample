const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const teacherModel = require('../../models/teacher.model');

const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password} = req.body;
    try {
        const teacher = await teacherModel.findOne({ email: email });
        if (!teacher || teacher.role !== 'teacher') {
            return res.status(404).json({ message: "Invalid credentials or role"});
        }

        const isMatch = await bcrypt.compare(password, teacher.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // Check if the default password is being used and if the password has not been changed yet
        const isDefaultPassword = await bcrypt.compare('123456', teacher.password);
        if (isDefaultPassword && !teacher.passwordChanged) {
            // Respond with an instruction to change the password
            return res.status(200).json({
                message: "Default password in use. Password change required.",
                user: teacher,
                passwordChangeRequired: true // Flag to indicate that password change is required
            });
        }

        const token = jwt.sign({ email: teacher.email, role: teacher.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ message: "Login successful", token: token });
    } catch (err) {
        res.status(500).json({ message: "Login error", error: err.message });
    }
};

const changePassword = async (req, res) => {
    const { email, newPassword } = req.body;
   
    try {
        const teacher = await teacherModel.findOne({ email });
        if (!teacher) {
            return res.status(404).json({ message: "teacher not found." });
        }

        // Check if the password has already been changed
        if (teacher.passwordChanged) {
            return res.status(403).json({ message: "Password has already been changed." });
        }

        // Hash the new password and update the teacher record
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        teacher.password = hashedPassword;
        teacher.passwordChanged = true;
        await teacher.save();

        res.status(200).json({ message: "Password changed successfully." });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    login,
    changePassword
};
