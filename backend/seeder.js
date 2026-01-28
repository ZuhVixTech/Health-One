const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors'); // Optional, but since we don't have it, we'll skip colors or just use console
const users = require('./data/users'); // We will create this or just inline data
const User = require('./models/userModel');
const Patient = require('./models/patientModel');
const Doctor = require('./models/doctorModel');
const Prescription = require('./models/prescriptionModel');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Patient.deleteMany();
        await Doctor.deleteMany();
        await Prescription.deleteMany();

        const createdUsers = await User.insertMany([
            {
                name: 'System Admin',
                email: 'admin@example.com',
                password: 'password123', // Will be hashed by pre-save hook? No, insertMany might skip hooks if not careful. stick to create or loop.
                role: 'admin'
            },
            {
                name: 'Dr. John Doe',
                email: 'doctor@example.com',
                password: 'password123',
                role: 'doctor'
            },
            {
                name: 'Nurse Mary',
                email: 'staff@example.com',
                password: 'password123',
                role: 'staff'
            }
        ]);

        // Fix password hashing: insertMany DOES NOT trigger pre('save') middleware in Mongoose.
        // We need to use create or manually hash. 
        // For simplicity in this script, let's just clear and use a loop to create so hooks run.
        await User.deleteMany(); // Clear again just to be safe

        const adminUser = await User.create({
            name: 'System Admin',
            email: 'admin@example.com',
            password: 'password123',
            role: 'admin'
        });

        const doctorUser = await User.create({
            name: 'Dr. John Doe',
            email: 'doctor@example.com',
            password: 'password123',
            role: 'doctor'
        });

        // Create Doctor Profile
        const doctorProfile = await Doctor.create({
            user: doctorUser._id,
            registrationNumber: 'REG12345',
            qualification: 'MBBS, MD',
            specialization: 'Cardiology',
            contact: '555-0123'
        });

        const patient = await Patient.create({
            medicalId: 'P001',
            name: 'Alice Smith',
            age: 34,
            gender: 'Female',
            mobile: '555-9876',
            bloodGroup: 'O+',
            allergies: 'Peanuts',
            chronicConditions: 'None'
        });

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();
        await Patient.deleteMany();
        await Doctor.deleteMany();
        await Prescription.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
