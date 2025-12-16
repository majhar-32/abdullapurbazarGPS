const express = require('express');
const router = express.Router();
const { getTeachers, createTeacher, deleteTeacher } = require('../controllers/teacherController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getTeachers).post(protect, createTeacher);
router.route('/:id').delete(protect, deleteTeacher);

module.exports = router;
