const express = require('express');
const router = express.Router();
const { createPrescription, getPrescriptionsByPatient } = require('../controllers/prescriptionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createPrescription);

router.route('/patient/:id')
    .get(protect, getPrescriptionsByPatient);

module.exports = router;
