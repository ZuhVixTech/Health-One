# AI-Powered Digital Prescription Management System

A production-ready full-stack application for clinics and hospitals to manage patients, doctors, and prescriptions with AI-assisted processing.

## Tech Stack
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + MongoDB + Mongoose
- **Auth**: JWT (JSON Web Tokens)
- **PDF**: PDFKit for server-side generation
- **AI Simulation**: Mock AI processing for prescription digitization

## Prerequisites
- Node.js (v14+)
- MongoDB (Running locally or via Atlas)

## Setup Instructions

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (already created) with:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/prescription_db
   JWT_SECRET=your_secret_key
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite dev server:
   ```bash
   npm run dev
   ```

## Features
- **Role-Based Auth**: Doctors and Admins.
- **Dashboard**: Quick stats and actions.
- **Patient Management**: ADD, SEARCH, and VIEW patients.
- **Prescription Builder**: Create prescriptions with Vitals, Medicines, Advice. Generates PDF.
- **AI Processing**: Upload a prescription image/PDF, and the "AI" extracts data (mocked) to auto-fill the form.

## API Documentation
- `POST /api/users/login`: Authenticate user.
- `POST /api/users`: Register user.
- `GET /api/patients`: List patients (keyword search).
- `POST /api/patients`: Create patient.
- `POST /api/prescriptions`: Create prescription (Generates PDF).
- `POST /api/ai/process`: Upload and extracting prescription data.

## Usage Flow
1. Register/Login.
2. Go to **Patients > Add Patient** to create a record.
3. Go to **AI Prescription** to upload a file -> Extract Data -> Confirm -> Save.
4. Or go to **New Prescription**, select a patient, fill details, and Save.
