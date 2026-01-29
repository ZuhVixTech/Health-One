import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendar, FaEdit } from 'react-icons/fa';

const Profile = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    // Helper to safely format date
    const formatDate = (dateString) => {
        try {
            return new Date(dateString || Date.now()).toLocaleDateString();
        } catch (e) {
            return new Date().toLocaleDateString();
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold text-gray-800">My Profile</h1>
                <p className="text-gray-600 mt-2">View and manage your account information</p>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Background Banner */}
                <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-800"></div>

                {/* Profile Content */}
                <div className="px-8 pb-8">
                    {/* Avatar */}
                    <div className="flex items-end space-x-6 -mt-16 mb-8">
                        <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold text-gray-800">{user?.name}</h2>
                            <p className="text-gray-600 capitalize text-lg">{user?.role} Account</p>
                        </div>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                            <FaEdit /> Edit Profile
                        </button>
                    </div>

                    {/* Information Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t">
                        <div className="flex items-start space-x-4">
                            <FaEnvelope className="text-blue-600 text-xl mt-1" />
                            <div>
                                <p className="text-gray-600 text-sm font-semibold">Email Address</p>
                                <p className="text-gray-800 font-semibold mt-1">{user?.email}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <FaPhone className="text-blue-600 text-xl mt-1" />
                            <div>
                                <p className="text-gray-600 text-sm font-semibold">Phone Number</p>
                                <p className="text-gray-800 font-semibold mt-1">{user?.phone || 'Not provided'}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <FaMapMarkerAlt className="text-blue-600 text-xl mt-1" />
                            <div>
                                <p className="text-gray-600 text-sm font-semibold">Location</p>
                                <p className="text-gray-800 font-semibold mt-1">{user?.location || 'Not provided'}</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <FaCalendar className="text-blue-600 text-xl mt-1" />
                            <div>
                                <p className="text-gray-600 text-sm font-semibold">Member Since</p>
                                <p className="text-gray-800 font-semibold mt-1">{formatDate(user?.createdAt)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Additional Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Account Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white rounded-lg p-4">
                        <p className="text-gray-600 text-sm font-semibold">Account Type</p>
                        <p className="text-xl font-bold text-blue-600 mt-2 capitalize">{user?.role}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <p className="text-gray-600 text-sm font-semibold">Verification Status</p>
                        <p className="text-xl font-bold text-green-600 mt-2">Verified</p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                        <p className="text-gray-600 text-sm font-semibold">Account Status</p>
                        <p className="text-xl font-bold text-green-600 mt-2">Active</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
