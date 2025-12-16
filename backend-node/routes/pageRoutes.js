const express = require('express');
const router = express.Router();
const { getPages, savePage, getPageByKey, getAllPages, deletePage } = require('../controllers/pageController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getPages).post(protect, savePage);
router.route('/all').get(protect, getAllPages);
router.route('/:id').delete(protect, deletePage);
router.route('/:pageKey').get(getPageByKey);

module.exports = router;
