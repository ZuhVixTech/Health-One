const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const connectDB = require('./config/db');

// Load environment variables
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/users', userRoutes);

const patientRoutes = require('./routes/patientRoutes');
app.use('/api/patients', patientRoutes);

const doctorRoutes = require('./routes/doctorRoutes');
app.use('/api/doctors', doctorRoutes);

const prescriptionRoutes = require('./routes/prescriptionRoutes');
app.use('/api/prescriptions', prescriptionRoutes);

const aiRoutes = require('./routes/aiRoutes');
app.use('/api/ai', aiRoutes);





app.get('/', (req, res) => {
    res.send('Digital Prescription System API is running...');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
