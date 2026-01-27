const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    registrationNumber: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    contactOffset: {
        type: String // e.g., Phone or personalized contact info specific to doctor profile
    },
    signatureImage: {
        type: String // Path to uploaded image
    },
    stampImage: {
        type: String // Path to uploaded image
    }
}, {
    timestamps: true
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
