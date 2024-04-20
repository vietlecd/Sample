// Add a new course
const Course = require('../../models/course.model');
const addCourse = async (req, res) => {
    // Logic to add a new course to the database
    try {
      const newCourse = new Course({
          
          courseCode: req.body.courseCode,
          
     });
      await newCourse.save();
      res.status(201).json(newCourse);
    } catch (error) {
      res.status(400).send(error.message);
    }
};
module.exports = {
    addCourse
}