import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaSignOutAlt, FaUser, FaCog } from 'react-icons/fa';
import { useState } from 'react';

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition mr-auto">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-lg">H</span>
                        </div>
                        <span className="text-xl font-bold hidden sm:inline">HealthOne</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex space-x-8 items-center mr-8">
                        <Link to="/" className="flex items-center space-x-2 hover:text-blue-200 transition">
                            <FaHome /> <span>Home</span>
                        </Link>
                    </nav>

                    {/* User Menu */}
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center space-x-3 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 transition"
                                >
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-blue-600 font-bold">
                                        {user?.name?.charAt(0) || 'U'}
                                    </div>
                                    <span className="hidden sm:inline text-sm font-medium">{user?.name}</span>
                                </button>

                                {/* Dropdown Menu */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl py-2 z-50">
                                        <div className="px-4 py-3 border-b border-gray-200">
                                            <p className="font-semibold">{user?.name}</p>
                                            <p className="text-xs text-gray-600">{user?.email}</p>
                                            <p className="text-xs text-blue-600 capitalize font-semibold mt-1">{user?.role}</p>
                                        </div>
                                        <Link to="/profile" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition">
                                            <FaUser /> <span>Profile</span>
                                        </Link>
                                        <Link to="/settings" className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 transition">
                                            <FaCog /> <span>Settings</span>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-red-100 text-red-600 transition border-t border-gray-200 mt-2"
                                        >
                                            <FaSignOutAlt /> <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
