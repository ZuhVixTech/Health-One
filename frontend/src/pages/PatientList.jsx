import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch } from 'react-icons/fa';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [keyword, setKeyword] = useState('');

    const fetchPatients = async (search = '') => {
        try {
            const { data } = await api.get(`/patients?keyword=${search}`);
            setPatients(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        fetchPatients(keyword);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Patients</h1>
                <Link to="/patients/add" className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700">
                    <FaPlus /> Add Patient
                </Link>
            </div>

            <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                <input
                    type="text"
                    placeholder="Search by name..."
                    className="border p-2 rounded w-full max-w-md focus:outline-none focus:ring-2 focus:ring-primary"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit" className="bg-secondary text-white p-2 rounded hover:bg-gray-800">
                    <FaSearch />
                </button>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {patients.map((patient) => (
                    <div key={patient._id} className="bg-white p-4 rounded shadow border border-gray-200">
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl font-semibold text-gray-700">{patient.name}</h3>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{patient.gender}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">ID: {patient.medicalId}</p>
                        <p className="text-sm text-gray-600 mt-2">Age: {patient.age}</p>
                        <p className="text-sm text-gray-600">Mobile: {patient.mobile}</p>
                        <div className="mt-4 flex justify-end">
                            <Link to={`/prescriptions/create?patientId=${patient._id}`} className="text-sm text-primary hover:underline">
                                New Prescription
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {patients.length === 0 && <p className="text-center text-gray-500 mt-10">No patients found.</p>}
        </div>
    );
};

export default PatientList;
