import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import ErrorBoundary from '@/Components/ErrorBoundary';
const Show = ({ user }) => {
    return (
        <ErrorBoundary>
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">User Details</h1>
                    <Link 
                        href={`/users/${user.id}/edit`} 
                        className="px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg shadow hover:bg-yellow-700 transition duration-300"
                    >
                        Edit User
                    </Link>
                </div>

                <div className="space-y-4">
                    <div>
                        <span className="font-semibold text-gray-600">Name:</span>
                        <p className="text-gray-800">{user.name} </p>
                    </div>

                    <div>
                        <span className="font-semibold text-gray-600">Email:</span>
                        <p className="text-gray-800">{user.email}</p>
                    </div>

                    <div>
                        <span className="font-semibold text-gray-600">Phone:</span>
                        <p className="text-gray-800">{user.nomor_hp || 'N/A'}</p>
                    </div>

                    <div>
                        <span className="font-semibold text-gray-600">Address:</span>
                        <p className="text-gray-800">{user.alamat || 'N/A'}</p>
                    </div>

                    <div>
                        <span className="font-semibold text-gray-600">Role:</span>
                        <p className="text-gray-800 capitalize">{user.role}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <Link 
                        href="/users" 
                        className="px-4 py-2 bg-gray-600 text-white font-semibold rounded-lg shadow hover:bg-gray-700 transition duration-300"
                    >
                        Back to Users
                    </Link>
                </div>
            </div>
        </div>
        </ErrorBoundary>
    );
};

export default Show;
