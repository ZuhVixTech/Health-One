import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserMd, FaUsers, FaFilePrescription, FaRobot, FaSignOutAlt } from 'react-icons/fa';

const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-secondary text-white flex flex-col">
                <div className="p-6 text-2xl font-bold text-primary bg-gray-900">
                    HealthOne
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/" className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded transition">
                        <FaUserMd /> <span>Dashboard</span>
                    </Link>
                    <Link to="/patients" className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded transition">
                        <FaUsers /> <span>Patients</span>
                    </Link>
                    <Link to="/prescriptions/create" className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded transition">
                        <FaFilePrescription /> <span>New Prescription</span>
                    </Link>
                    <Link to="/ai-processing" className="flex items-center space-x-3 p-3 hover:bg-gray-700 rounded transition">
                        <FaRobot /> <span>AI Prescription</span>
                    </Link>
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div>
                            <p className="text-sm font-semibold">{user?.name}</p>
                            <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="flex items-center space-x-2 text-red-400 hover:text-red-300 w-full">
                        <FaSignOutAlt /> <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
