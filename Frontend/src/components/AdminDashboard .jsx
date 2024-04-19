import React from 'react';

const AdminDashboard = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="bg-gray-800 w-64">
                <div className="flex flex-col h-screen">
                    <div className="flex items-center justify-center py-4">
                        <h1 className="text-white text-2xl font-bold">Admin Dashboard</h1>
                    </div>
                    <nav className="mt-5 flex-1 px-2 bg-gray-800">
                        <a href="#" className="block py-2 px-4 text-gray-200 hover:bg-gray-700">Dashboard</a>
                        <a href="#" className="block py-2 px-4 text-gray-200 hover:bg-gray-700">Users</a>
                        <a href="#" className="block py-2 px-4 text-gray-200 hover:bg-gray-700">Products</a>
                        <a href="#" className="block py-2 px-4 text-gray-200 hover:bg-gray-700">Settings</a>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                <div className="p-6">
                    <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
                    <div className="mt-4 bg-white p-6 rounded-lg shadow">
                        <p className="text-gray-700">Welcome to the Admin Dashboard!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
