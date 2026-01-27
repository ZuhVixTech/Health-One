const Prescription = require('../models/prescriptionModel');
const Doctor = require('../models/doctorModel');
const generatePDF = require('../utils/generatePDF');
const path = require('path');
const fs = require('fs');

// @desc    Create new prescription
// @route   POST /api/prescriptions
// @access  Private (Doctor)
const createPrescription = async (req, res) => {
    try {
        const { patient, vitals, complaints, medicines, diagnosis, advice, investigations, followUpDate } = req.body;

        const doctor = await Doctor.findOne({ user: req.user._id }).populate('user');
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor profile not found' });
        }

        const prescription = new Prescription({
            doctor: doctor._id,
            patient,
            vitals,
            complaints,
            medicines,
            diagnosis,
            advice,
            investigations,
            followUpDate
        });

        const createdPrescription = await prescription.save();

        // Generate PDF
        // Ensure uploads/prescriptions exists
        const pdfDir = 'uploads/prescriptions';
        if (!fs.existsSync(pdfDir)) {
            fs.mkdirSync(pdfDir, { recursive: true });
        }

        const pdfName = `prescription-${createdPrescription._id}.pdf`;
        const pdfPath = path.join(pdfDir, pdfName);

        // Fetch full patient data for PDF
        const fullPrescription = await Prescription.findById(createdPrescription._id)
            .populate('patient')
            .populate({ path: 'doctor', populate: { path: 'user' } });

        await generatePDF(fullPrescription, pdfPath);

        fullPrescription.pdfPath = pdfPath;
        await fullPrescription.save();

        res.status(201).json(fullPrescription);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get prescriptions by patient ID
// @route   GET /api/prescriptions/patient/:id
// @access  Private
const getPrescriptionsByPatient = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ patient: req.params.id })
            .populate('doctor')
            .sort({ date: -1 });
        res.json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createPrescription, getPrescriptionsByPatient };
