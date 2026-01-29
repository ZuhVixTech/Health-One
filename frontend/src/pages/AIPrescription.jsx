import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt, FaSpinner, FaCheckCircle, FaExclamationTriangle, FaArrowLeft, FaImage, FaBrain } from 'react-icons/fa';

const AIPrescription = () => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setError('');
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setError('Please select a file first');
            return;
        }

        const formData = new FormData();
        formData.append('prescriptionFile', file);

        setLoading(true);
        setError('');
        try {
            const { data } = await api.post('/ai/process', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult(data.data);
        } catch (error) {
            console.error(error);
            setError(error.response?.data?.message || 'AI Processing failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = () => {
        navigate('/prescriptions/create', { state: { aiData: result } });
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => navigate('/patients')}
                    className="p-2 hover:bg-gray-200 rounded-lg transition"
                >
                    <FaArrowLeft className="text-xl text-gray-600" />
                </button>
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">AI Prescription Processing</h1>
                    <p className="text-gray-600 mt-2">Upload a prescription image or PDF and let AI extract the details</p>
                </div>
            </div>

            {/* Upload Section */}
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

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                        <FaImage className="text-blue-600" />
                        <span>Upload Prescription</span>
                    </h2>

                    <form onSubmit={handleUpload} className="space-y-6">
                        <div>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                className="hidden"
                                id="file-upload"
                                accept=".pdf,.jpg,.jpeg,.png"
                            />
                            <label
                                htmlFor="file-upload"
                                className="block border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-500 hover:bg-blue-50 transition cursor-pointer bg-gray-50"
                            >
                                <div className="flex flex-col items-center">
                                    <FaCloudUploadAlt size={64} className="text-gray-400 mb-4" />
                                    <span className="text-gray-700 font-semibold text-lg">Click to upload prescription</span>
                                    <span className="text-gray-500 mt-2">or drag and drop</span>
                                    <span className="text-xs text-gray-400 mt-2">(Supported formats: JPG, PNG, PDF - Max 10MB)</span>
                                </div>
                            </label>
                        </div>

                        {file && (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <p className="text-green-800 font-semibold flex items-center space-x-2">
                                    <FaCheckCircle />
                                    <span>File selected: {file.name}</span>
                                </p>
                                <p className="text-green-700 text-sm mt-1">Size: {(file.size / 1024).toFixed(2)} KB</p>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={!file || loading}
                            className={`w-full py-3 rounded-lg font-bold text-white transition flex justify-center items-center gap-2 ${
                                !file || loading
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-blue-600 to-blue-800 hover:shadow-lg'
                            }`}
                        >
                            {loading ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    <span>Processing with AI...</span>
                                </>
                            ) : (
                                <>
                                    <FaBrain />
                                    <span>Analyze with AI</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Processing Indicator */}
                {loading && (
                    <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                        <div className="flex items-center space-x-4">
                            <div className="animate-spin">
                                <FaSpinner className="text-3xl text-blue-600" />
                            </div>
                            <div>
                                <p className="text-blue-900 font-semibold">AI is analyzing your prescription...</p>
                                <p className="text-blue-700 text-sm mt-1">This may take a few moments</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Results Section */}
            {result && (
                <div className="bg-white rounded-lg shadow-lg p-8 space-y-6 animate-fadeIn">
                    {/* Header with Confidence */}
                    <div className="flex justify-between items-center pb-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold flex items-center gap-3">
                            <FaCheckCircle className="text-green-500 text-3xl" />
                            <span className="text-gray-800">Analysis Complete</span>
                        </h2>
                        <div className="bg-gradient-to-r from-green-100 to-blue-100 text-green-800 px-4 py-2 rounded-full font-semibold">
                            Confidence: {(result.confidenceScore * 100).toFixed(0)}%
                        </div>
                    </div>

                    {/* Vitals Section */}
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Extracted Vital Signs</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {result.vitals && Object.entries(result.vitals).map(([key, value]) => (
                                <div key={key} className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                    <p className="text-gray-600 text-sm font-semibold capitalize">{key}</p>
                                    <p className="text-2xl font-bold text-blue-700 mt-2">{value.value}</p>
                                    <p className="text-xs text-gray-500 mt-1">Confidence: {(value.confidence * 100).toFixed(0)}%</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Complaints Section */}
                    {result.complaints && result.complaints.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Identified Complaints</h3>
                            <div className="space-y-2">
                                {result.complaints.map((complaint, idx) => (
                                    <div key={idx} className="bg-orange-50 rounded-lg p-4 border border-orange-200 flex items-start space-x-3">
                                        <FaExclamationTriangle className="text-orange-600 mt-1 flex-shrink-0" />
                                        <div className="flex-1">
                                            <p className="text-gray-800 font-semibold">{complaint.value}</p>
                                            <p className="text-xs text-gray-600 mt-1">Confidence: {(complaint.confidence * 100).toFixed(0)}%</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Medicines Section */}
                    {result.medicines && result.medicines.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Extracted Medicines</h3>
                            <div className="space-y-3">
                                {result.medicines.map((medicine, idx) => (
                                    <div key={idx} className="bg-green-50 rounded-lg p-4 border border-green-200">
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                            <div>
                                                <p className="text-xs text-gray-600 font-semibold">Medicine</p>
                                                <p className="text-gray-800 font-bold">{medicine.name.value}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 font-semibold">Strength</p>
                                                <p className="text-gray-800 font-bold">{medicine.strength.value}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 font-semibold">Frequency</p>
                                                <p className="text-gray-800 font-bold">{medicine.frequency.value}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 font-semibold">Duration</p>
                                                <p className="text-gray-800 font-bold">{medicine.duration.value}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 font-semibold">Confidence</p>
                                                <p className="text-gray-800 font-bold">{(medicine.name.confidence * 100).toFixed(0)}%</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="border-t pt-6 flex gap-4">
                        <button
                            type="button"
                            onClick={() => { setFile(null); setResult(null); setError(''); }}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                        >
                            Upload Another
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-blue-800 text-white rounded-lg hover:shadow-lg transition font-semibold"
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
