const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    medicalId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String
    },
    dob: {
        type: Date
    },
    mobile: {
        type: String,
        required: true
    },
    allergies: {
        type: String
    },
    chronicConditions: {
        type: String
    },
    medicalHistory: [{
        condition: String,
        date: Date,
        notes: String
    }]
}, {
    timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
