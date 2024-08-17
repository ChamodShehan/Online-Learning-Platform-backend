const Course = require('../models/Course');
const mongoose = require('mongoose');

exports.createCourse = async (req, res) => {
  const { title, description, content } = req.body;
  try {
    const course = new Course({
      title,
      description,
      content,
      instructor: req.user.id,
    });
    await course.save();
    res.status(201).json({ message: 'Course created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('instructor', 'username');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      'instructor',
      'username'
    );
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateCourse = async (req, res) => {
  const { title, description, content } = req.body;
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (
      course.instructor.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    course.title = title;
    course.description = description;
    course.content = content;
    await course.save();

    res.json({ message: 'Course updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (
      course.instructor.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await course.deleteOne();
    res.json({ message: 'Course removed successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.getEnrolledCourses = async (req, res) => {
  console.log('getEnrolledCourses function called');
  try {
    const userId = req.params.userId;
    console.log('User ID:', userId);

    const courses = await Course.find({ students: userId });
    console.log('Courses found:', courses);

    res.json(courses);
  } catch (err) {
    console.error('Error fetching enrolled courses:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};





exports.getTaughtCourses = async (req, res) => {
  console.log('getTaughtCourses function called');
  try {
    const instructorId = req.params.userId;
    console.log('Instructor ID:', instructorId);

    if (req.user.role !== 'instructor' || req.user.id !== instructorId) {
      return res.status(403).json({
        message: 'Access denied: Only the instructor can view their taught courses.',
      });
    }

    const courses = await Course.find({ instructor: instructorId })
      .populate('students', 'username')
      .populate('instructor', 'username');
    console.log('Courses found:', courses);

    res.json(courses);
  } catch (err) {
    console.error('Error fetching taught courses:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



exports.enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    if (course.students.includes(req.user.id)) {
      return res.status(400).json({ message: 'User already enrolled in this course' });
    }

    course.students.push(req.user.id);
    await course.save();
    res.json({ message: 'Enrolled successfully' });
  } catch (err) {
    console.error('Error enrolling in course:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


