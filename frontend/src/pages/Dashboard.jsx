import { Link } from 'react-router-dom';
import { FaUserPlus, FaFilePrescription, FaChartLine } from 'react-icons/fa';

const Dashboard = () => {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500">Total Patients</p>
                            <h3 className="text-2xl font-bold">128</h3>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-full text-blue-500">
                            <FaUserPlus size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500">Prescriptions Today</p>
                            <h3 className="text-2xl font-bold">12</h3>
                        </div>
                        <div className="p-3 bg-green-100 rounded-full text-green-500">
                            <FaFilePrescription size={24} />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-purple-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-gray-500">Pending Reports</p>
                            <h3 className="text-2xl font-bold">3</h3>
                        </div>
                        <div className="p-3 bg-purple-100 rounded-full text-purple-500">
                            <FaChartLine size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                <div className="flex gap-4">
                    <Link to="/patients/add" className="bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition">
                        Add New Patient
                    </Link>
                    <Link to="/ai-processing" className="bg-secondary text-white px-6 py-3 rounded-lg shadow hover:bg-gray-700 transition">
                        AI Prescription Tool
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
