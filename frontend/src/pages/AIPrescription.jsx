import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const AIPrescription = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('prescriptionFile', file);

        setLoading(true);
        try {
            const { data } = await api.post('/ai/process', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult(data.data);
        } catch (error) {
            console.error(error);
            alert('AI Processing Failed');
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = () => {
        // Navigate to CreatePrescription with pre-filled state
        navigate('/prescriptions/create', { state: { aiData: result } });
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">AI Prescription Processing</h1>

            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary transition cursor-pointer bg-gray-50">
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                        <FaCloudUploadAlt size={48} className="text-gray-400 mb-4" />
                        <span className="text-gray-600 font-medium">Click to upload prescription image or PDF</span>
                        <span className="text-xs text-gray-400 mt-2">(Supported: JPG, PNG, PDF)</span>
                    </label>
                </div>
                {file && <p className="mt-4 text-center text-gray-700 font-semibold">Selected: {file.name}</p>}

                <button
                    onClick={handleUpload}
                    disabled={!file || loading}
                    className={`mt-6 w-full py-3 rounded-lg font-bold text-white transition flex justify-center items-center gap-2
                        ${!file || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-blue-700'}`}
                >
                    {loading ? <><FaSpinner className="animate-spin" /> Processing...</> : 'Analyze with AI'}
                </button>
            </div>

            {result && (
                <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h2 className="text-2xl font-bold flex items-center gap-2">
                            <FaCheckCircle className="text-green-500" /> Analysis Complete
                        </h2>
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                            Confidence: {(result.confidenceScore * 100).toFixed(0)}%
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Extracted Data Visualization */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-700 border-b pb-2">Patient Details</h3>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Name:</span>
                                <span className="font-medium">{result.patient.name.value}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Age/Gender:</span>
                                <span className="font-medium">{result.patient.age.value} / {result.patient.gender.value}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-semibold text-gray-700 border-b pb-2">Vitals</h3>
                            <div className="flex justify-between">
                                <span className="text-gray-500">BP:</span>
                                <span className="font-medium">{result.vitals.bp.value}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Temp:</span>
                                <span className="font-medium">{result.vitals.temperature.value}</span>
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-2 space-y-4">
                            <h3 className="font-semibold text-gray-700 border-b pb-2">Medicines Detected</h3>
                            <ul className="space-y-2">
                                {result.medicines.map((med, idx) => (
                                    <li key={idx} className="bg-gray-50 p-3 rounded flex justify-between items-center">
                                        <span className="font-medium text-gray-800">{med.name.value} ({med.strength.value})</span>
                                        <span className="text-sm text-gray-500">{med.frequency.value} - {med.duration.value}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={handleConfirm}
                            className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700 transition"
                        >
                            Confirm & Create Prescription
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIPrescription;
