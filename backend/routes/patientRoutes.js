const express = require('express');
const router = express.Router();
const { createPatient, getPatients, getPatientById } = require('../controllers/patientController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createPatient)
    .get(protect, getPatients);

router.route('/:id')
    .get(protect, getPatientById);

module.exports = router;
