import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AddPatient = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        medicalId: '',
        age: '',
        gender: 'Male',
        mobile: '',
        bloodGroup: '',
        allergies: '',
        chronicConditions: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/patients', formData);
            navigate('/patients');
        } catch (error) {
            alert(error.response?.data?.message || 'Error adding patient');
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
            <h1 className="text-2xl font-bold mb-6">Add New Patient</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-1">Full Name</label>
                    <input name="name" onChange={handleChange} required className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Medical ID</label>
                    <input name="medicalId" onChange={handleChange} required className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Mobile Number</label>
                    <input name="mobile" onChange={handleChange} required className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Age</label>
                    <input name="age" type="number" onChange={handleChange} required className="w-full border p-2 rounded" />
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Gender</label>
                    <select name="gender" onChange={handleChange} className="w-full border p-2 rounded">
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 mb-1">Blood Group</label>
                    <input name="bloodGroup" onChange={handleChange} className="w-full border p-2 rounded" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-1">Allergies</label>
                    <textarea name="allergies" onChange={handleChange} className="w-full border p-2 rounded" rows="2" />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-1">Chronic Conditions</label>
                    <textarea name="chronicConditions" onChange={handleChange} className="w-full border p-2 rounded" rows="2" />
                </div>

                <div className="md:col-span-2 mt-4">
                    <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-blue-600">Save Patient</button>
                </div>
            </form>
        </div>
    );
};

export default AddPatient;
