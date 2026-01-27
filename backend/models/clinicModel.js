const mongoose = require('mongoose');

const clinicSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // The doctor/admin who owns/manages this clinic record
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    logo: {
        type: String
    }
}, {
    timestamps: true
});

const Clinic = mongoose.model('Clinic', clinicSchema);
module.exports = Clinic;
