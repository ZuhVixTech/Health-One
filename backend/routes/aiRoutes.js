const express = require('express');
const router = express.Router();
const { processPrescription } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.post('/process', protect, upload.single('prescriptionFile'), processPrescription);

module.exports = router;
