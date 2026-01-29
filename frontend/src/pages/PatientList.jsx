import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';
import { FaPlus, FaSearch, FaPhone, FaCalendar, FaUser, FaEdit, FaEye } from 'react-icons/fa';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchPatients = async (search = '') => {
        setLoading(true);
        try {
            const { data } = await api.get(`/patients?keyword=${search}`);
            setPatients(data.patients || data || []);
        } catch (error) {
            console.error('Error fetching patients:', error);
            setPatients([]);
        } finally {
            setLoading(false);
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
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">Patients Management</h1>
                    <p className="text-gray-600 mt-2">Manage and view all patient records</p>
                </div>
                <Link to="/patients/add" className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:shadow-lg transition-shadow font-semibold">
                    <FaPlus /> Add New Patient
                </Link>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex gap-3">
                    <div className="flex-1 relative">
                        <FaSearch className="absolute left-4 top-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search patients by name, email, or ID..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition font-semibold">
                        Search
                    </button>
                </div>
            </form>

            {/* Stats */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
                <p className="text-gray-600 font-semibold">Total Patients: <span className="text-2xl text-blue-600 ml-2">{patients.length}</span></p>
            </div>

            {/* Patients Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="animate-spin">
                            <FaUser className="text-3xl text-blue-600" />
                        </div>
                        <p className="ml-4 text-gray-600 font-semibold">Loading patients...</p>
                    </div>
                ) : patients.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Patient Name</th>
                                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Email</th>
                                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Phone</th>
                                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Age</th>
                                    <th className="px-6 py-4 text-left font-semibold text-gray-700">Gender</th>
                                    <th className="px-6 py-4 text-center font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {patients.map((patient) => (
                                    <tr key={patient._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                                                    {patient.name?.charAt(0) || 'P'}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{patient.name}</p>
                                                    <p className="text-xs text-gray-500">{patient.medicalId || 'N/A'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">{patient.email}</td>
                                        <td className="px-6 py-4">
                                            <a href={`tel:${patient.phone}`} className="text-blue-600 hover:underline flex items-center space-x-2">
                                                <FaPhone className="text-sm" />
                                                <span>{patient.phone || 'N/A'}</span>
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">{patient.age || 'N/A'}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                                                {patient.gender || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center space-x-2">
                                                <Link to={`/patients/${patient._id}`} className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition" title="View Details">
                                                    <FaEye />
                                                </Link>
                                                <Link to={`/prescriptions/create?patientId=${patient._id}`} className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg transition" title="Create Prescription">
                                                    <FaPlus />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-16">
                        <FaUser className="text-6xl text-gray-300 mb-4" />
                        <p className="text-gray-500 font-semibold mb-4">No patients found</p>
                        <Link to="/patients/add" className="text-blue-600 hover:text-blue-800 font-semibold">
                            Start by adding a new patient
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PatientList;
