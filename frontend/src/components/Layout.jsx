import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaUsers, FaFileAlt, FaBrain, FaChartLine, FaCog } from 'react-icons/fa';
import Header from './Header';
import Footer from './Footer';
import { useState } from 'react';

const Layout = () => {
    const { user } = useAuth();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { path: '/', label: 'Dashboard', icon: FaHome },
        { path: '/patients', label: 'Patients', icon: FaUsers },
        { path: '/prescriptions/create', label: 'New Prescription', icon: FaFileAlt },
        { path: '/ai-processing', label: 'AI Prescription', icon: FaBrain },
        { path: '/reports', label: 'Reports', icon: FaChartLine },
    ];

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Header */}
            <Header />

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col overflow-y-auto`}>
                    {/* Sidebar Header removed to avoid duplicate branding */}

                    <nav className="flex-1 p-4 space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive(item.path)
                                        ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-600'
                                        : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                    title={!sidebarOpen ? item.label : ''}
                                >
                                    <Icon className="flex-shrink-0 text-lg" />
                                    {sidebarOpen && <span className="font-medium">{item.label}</span>}
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="p-4 border-t border-gray-200 space-y-4">
                        <Link to="/settings" className="flex items-center space-x-3 px-4 py-3 text-gray-600 rounded-lg hover:bg-gray-100 transition-all duration-200" title={!sidebarOpen ? 'Settings' : ''}>
                            <FaCog className="flex-shrink-0 text-lg" />
                            {sidebarOpen && <span className="font-medium">Settings</span>}
                        </Link>
                        <div className={`flex items-center space-x-3 p-3 bg-gray-100 rounded-lg ${!sidebarOpen && 'justify-center'}`}>
                            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            {sidebarOpen && (
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-gray-800 truncate">{user?.name}</p>
                                    <p className="text-xs text-gray-600 truncate capitalize">{user?.role}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <main className="flex-1 overflow-y-auto">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                            <Outlet />
                        </div>
                        <Footer />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Layout;
