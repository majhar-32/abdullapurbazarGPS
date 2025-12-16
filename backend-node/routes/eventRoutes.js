const express = require('express');
const router = express.Router();
const { getEvents, createEvent, deleteEvent, getEventById, updateEvent } = require('../controllers/eventController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getEvents).post(protect, createEvent);
router.route('/:id').get(getEventById).delete(protect, deleteEvent).put(protect, updateEvent);

module.exports = router;
