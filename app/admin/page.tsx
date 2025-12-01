'use client';

import React from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">Orders</h2>
                    <p className="text-gray-600 mb-4">Manage customer orders and shipments.</p>
                    <Link
                        href="/admin/orders"
                        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                        View Orders
                    </Link>
                </div>

                <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">Products</h2>
                    <p className="text-gray-600 mb-4">Add, edit, or remove products.</p>
                    <Link
                        href="/admin/products"
                        className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                    >
                        Manage Products
                    </Link>
                </div>

                <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
                    <h2 className="text-xl font-semibold mb-4">Bookings</h2>
                    <p className="text-gray-600 mb-4">View and manage appointments.</p>
                    <Link
                        href="/admin/bookings"
                        className="inline-block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                    >
                        View Bookings
                    </Link>
                </div>
            </div>
        </div>
    );
}
