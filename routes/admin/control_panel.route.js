const express = require('express');
const controlPanelController = require('./control_panel.controller');

const router = express.Router();

// Get all courses
router.get('/courses', controlPanelController.getCourses);

// Add a new course
router.post('/courses', controlPanelController.addCourse);

// Update an existing course
router.put('/courses/:id', controlPanelController.updateCourse);

// Delete a course
router.delete('/courses/:id', controlPanelController.deleteCourse);

module.exports = router;
