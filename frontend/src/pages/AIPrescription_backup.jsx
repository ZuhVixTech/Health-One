import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const AIPrescription = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError('');
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file');
            return;
        }

        const formData = new FormData();
        formData.append('prescriptionFile', file);

        setLoading(true);
        try {
            const { data } = await api.post('/ai/process', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult(data.data);
        } catch (error) {
            setError(error.response?.data?.message || 'Processing failed');
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = () => {
        navigate('/prescriptions/create', { state: { aiData: result } });
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-4xl font-bold text-gray-800">AI Prescription Processing</h1>
                <p className="text-gray-600 mt-2">Upload a prescription image for AI analysis</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                        <FaExclamationTriangle className="inline mr-2" /> {error}
                    </div>
                )}

                <form onSubmit={handleUpload} className="space-y-6">
                    <div>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload"
                            accept=".pdf,.jpg,.jpeg,.png"
                        />
                        <label htmlFor="file-upload" className="block border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 transition cursor-pointer">
                            <FaCloudUploadAlt className="text-5xl text-gray-400 mb-4 mx-auto" />
                            <span className="text-gray-700 font-semibold text-lg">Upload prescription</span>
                            <p className="text-gray-500 mt-2">JPG, PNG, or PDF</p>
                        </label>
                    </div>

                    {file && <p className="text-green-600 font-semibold">Selected: {file.name}</p>}

                    <button
                        type="submit"
                        disabled={!file || loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-lg font-bold hover:shadow-lg transition disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <><FaSpinner className="animate-spin" /> Processing...</> : 'Analyze with AI'}
                    </button>
                </form>
            </div>

            {result && (
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold flex items-center gap-3 mb-6">
                        <FaCheckCircle className="text-green-500 text-3xl" /> Analysis Complete
                    </h2>
                    <p className="text-gray-600 mb-4">AI has extracted prescription details. Review and proceed to create the prescription.</p>
                    <div className="flex gap-4">
                        <button onClick={() => { setFile(null); setResult(null); }} className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold">
                            Upload Another
                        </button>
                        <button onClick={handleConfirm} className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-800 text-white rounded-lg hover:shadow-lg font-semibold">
                            Proceed to Create Prescription
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIPrescription;
