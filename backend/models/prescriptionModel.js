const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    clinic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clinic'
    },
    date: {
        type: Date,
        default: Date.now
    },
    complaints: [{
        complaint: String,
        duration: String,
        severity: String
    }],
    vitals: {
        bp: String,
        pulse: String,
        temperature: String,
        spo2: String,
        weight: String,
        height: String
    },
    diagnosis: {
        type: String
    },
    medicines: [{
        name: String,
        strength: String,
        frequency: String, // e.g. 1-0-1
        duration: String,
        route: String, // Oral, IV
        instructions: String // Before food, etc.
    }],
    advice: {
        type: String
    },
    investigations: [{
        testName: String,
        notes: String
    }],
    followUpDate: {
        type: Date
    },
    pdfPath: {
        type: String
    }
}, {
    timestamps: true
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);
module.exports = Prescription;
