const Patient = require('../models/patientModel');

// @desc    Create a new patient
// @route   POST /api/patients
// @access  Private (Doctor/Staff)
const createPatient = async (req, res) => {
    try {
        const { medicalId, name, age, gender, mobile, ...otherDetails } = req.body;

        const patientExists = await Patient.findOne({ medicalId });
        if (patientExists) {
            return res.status(400).json({ message: 'Patient already exists' });
        }

        const patient = new Patient({
            medicalId,
            name,
            age,
            gender,
            mobile,
            ...otherDetails
        });

        const createdPatient = await patient.save();
        res.status(201).json(createdPatient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all patients
// @route   GET /api/patients
// @access  Private
const getPatients = async (req, res) => {
    try {
        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: 'i',
                },
            }
            : {};

        const patients = await Patient.find({ ...keyword });
        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get patient by ID
// @route   GET /api/patients/:id
// @access  Private
const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (patient) {
            res.json(patient);
        } else {
            res.status(404).json({ message: 'Patient not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPatient, getPatients, getPatientById };
