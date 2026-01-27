const Doctor = require('../models/doctorModel');
const User = require('../models/userModel');

// @desc    Create or Update doctor profile
// @route   POST /api/doctors/profile
// @access  Private (Doctor)
const updateDoctorProfile = async (req, res) => {
    try {
        const { registrationNumber, qualification, specialization, contact, clinicAddress } = req.body;

        let doctor = await Doctor.findOne({ user: req.user._id });

        const profileFields = {
            user: req.user._id,
            registrationNumber,
            qualification,
            specialization,
            contact,
            clinicAddress // Note: This might need to be linked to Clinic model if multiple clinics
        };

        if (req.files) {
            if (req.files.signature) profileFields.signatureImage = req.files.signature[0].path;
            if (req.files.stamp) profileFields.stampImage = req.files.stamp[0].path;
        }

        if (doctor) {
            doctor = await Doctor.findOneAndUpdate(
                { user: req.user._id },
                { $set: profileFields },
                { new: true }
            );
            res.json(doctor);
        } else {
            doctor = new Doctor(profileFields);
            await doctor.save();
            res.json(doctor);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get doctor profile
// @route   GET /api/doctors/profile
// @access  Private (Doctor)
const getDoctorProfile = async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ user: req.user._id });
        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).json({ message: 'Doctor profile not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { updateDoctorProfile, getDoctorProfile };
