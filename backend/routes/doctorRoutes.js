const express = require('express');
const router = express.Router();
const { updateDoctorProfile, getDoctorProfile } = require('../controllers/doctorController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/profile')
    .post(protect, upload.fields([{ name: 'signature' }, { name: 'stamp' }]), updateDoctorProfile)
    .get(protect, getDoctorProfile);

module.exports = router;
