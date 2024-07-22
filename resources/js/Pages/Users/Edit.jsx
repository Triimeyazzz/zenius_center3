import React from 'react';
import { usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from "@inertiajs/inertia-react";

const Show = () => {
    const { user } = usePage().props;

    return (
        <AuthenticatedLayout>
            <div className="container mx-auto px-4">
                
                <h1 className="text-2xl font-bold mb-4">User Details</h1>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                        <p className="text-gray-900">{user.name}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
                        <p className="text-gray-900">{user.email}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number:</label>
                        <p className="text-gray-900">{user.nomor_hp}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Address:</label>
                        <p className="text-gray-900">{user.alamat}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Role:</label>
                        <p className="text-gray-900">{user.role}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Created At:</label>
                        <p className="text-gray-900">{user.created_at}</p>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Updated At:</label>
                        <p className="text-gray-900">{user.updated_at}</p>
                    </div>
                    <div className="mb-4">
                    <Link
                                        href={`/users`}
                                        className="text-lg font-medium text-purple-600 hover:underline"
                                    >
                                        Back
                                    </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Show;
