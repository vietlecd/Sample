

const courseModel = require("../../models/course.model");


const getAllCourse = async (req, res) => {
    try {
        const course = await courseModel.find();
        res.json(course);
    } catch (error) {
        res.json({ message: error });
    }
};

module.exports = { getAllCourse };