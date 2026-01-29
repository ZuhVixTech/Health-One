import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaUser, FaPhoneAlt, FaCalendar, FaTint, FaExclamationTriangle, FaHeartbeat } from 'react-icons/fa';

const AddPatient = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        medicalId: '',
        age: '',
        gender: 'male',
        phone: '',
        bloodGroup: 'O+',
        allergies: '',
        chronicConditions: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await api.post('/patients', formData);
            navigate('/patients');
        } catch (error) {
            setError(error.response?.data?.message || 'Error adding patient. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const bloodGroups = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => navigate('/patients')}
                    className="p-2 hover:bg-gray-200 rounded-lg transition"
                >
                    <FaArrowLeft className="text-xl text-gray-600" />
                </button>
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">Add New Patient</h1>
                    <p className="text-gray-600 mt-2">Enter patient information to register them in the system</p>
                </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start space-x-3">
                        <FaExclamationTriangle className="text-xl mt-1 flex-shrink-0" />
                        <div>
                            <p className="font-semibold">Error</p>
                            <p className="text-sm">{error}</p>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Personal Information Section */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                            <FaUser className="text-blue-600" />
                            <span>Personal Information</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="john@example.com"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Medical ID</label>
                                <input
                                    type="text"
                                    name="medicalId"
                                    value={formData.medicalId}
                                    onChange={handleChange}
                                    placeholder="MED-001"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                                <div className="relative">
                                    <FaPhoneAlt className="absolute left-4 top-4 text-gray-400" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder="+1 (555) 000-0000"
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Health Information Section */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                            <FaHeartbeat className="text-red-600" />
                            <span>Health Information</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Age *</label>
                                <div className="relative">
                                    <FaCalendar className="absolute left-4 top-4 text-gray-400" />
                                    <input
                                        type="number"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        max="150"
                                        placeholder="25"
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Gender *</label>
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Blood Group</label>
                                <div className="relative">
                                    <FaTint className="absolute left-4 top-4 text-gray-400" />
                                    <select
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition appearance-none"
                                    >
                                        {bloodGroups.map((group) => (
                                            <option key={group} value={group}>{group}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Medical History Section */}
                    <div className="border-t pt-8">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                            <FaExclamationTriangle className="text-orange-600" />
                            <span>Medical History</span>
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Allergies</label>
                                <textarea
                                    name="allergies"
                                    value={formData.allergies}
                                    onChange={handleChange}
                                    placeholder="List any known allergies (e.g., Penicillin, Peanuts, etc.)"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                                    rows="3"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Chronic Conditions</label>
                                <textarea
                                    name="chronicConditions"
                                    value={formData.chronicConditions}
                                    onChange={handleChange}
                                    placeholder="List any chronic conditions or ongoing health issues"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                                    rows="3"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="border-t pt-8 flex gap-4">
                        <button
                            type="button"
                            onClick={() => navigate('/patients')}
                            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg hover:shadow-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Saving Patient...' : 'Save Patient'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPatient;
