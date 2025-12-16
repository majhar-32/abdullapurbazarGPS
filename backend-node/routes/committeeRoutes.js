const express = require('express');
const router = express.Router();
const { getCommitteeMembers, createCommitteeMember, deleteCommitteeMember } = require('../controllers/committeeController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getCommitteeMembers).post(protect, createCommitteeMember);
router.route('/:id').delete(protect, deleteCommitteeMember);

module.exports = router;
