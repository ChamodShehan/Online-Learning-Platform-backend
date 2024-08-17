const express = require('express');
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  enrollCourse,
  getTaughtCourses,
  getEnrolledCourses,
} = require('../controllers/courseController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createCourse);
router.get('/', getCourses);
router.get('/:id', getCourseById);
router.put('/:id', authMiddleware, updateCourse);
router.delete('/:id', authMiddleware, deleteCourse);
router.post('/enroll/:id', authMiddleware, enrollCourse);
router.get('/getEnrolledCourses/:userId', authMiddleware, getEnrolledCourses);
router.get('/getTaughtCourses/:userId', authMiddleware, getTaughtCourses);

module.exports = router;
