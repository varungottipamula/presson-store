'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Booking {
    _id: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    date: string;
    time: string;
    service: string;
    status: string;
    createdAt: string;
}

export default function AdminBookingsPage() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await fetch('/api/bookings');
            const data = await res.json();
            if (data.success) {
                setBookings(data.bookings);
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateBookingStatus = async (bookingId: string, status: string) => {
        try {
            const res = await fetch(`/api/bookings/${bookingId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            if (data.success) {
                fetchBookings();
            }
        } catch (error) {
            console.error('Error updating booking:', error);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <p>Loading bookings...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Bookings Management</h1>
                <Link href="/admin" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                    Back to Dashboard
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booked On</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {bookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                                        <div className="text-sm text-gray-500">{booking.customerEmail}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.customerPhone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.service}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {booking.date ? new Date(booking.date).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{booking.time || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            value={booking.status}
                                            onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                                            className={`text-sm border rounded px-2 py-1 ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800 border-green-300' :
                                                booking.status === 'completed' ? 'bg-blue-100 text-blue-800 border-blue-300' :
                                                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                                                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800 border-red-300' :
                                                            'bg-gray-100 text-gray-800 border-gray-300'
                                                }`}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="confirmed">Confirmed</option>
                                            <option value="completed">Completed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {new Date(booking.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {bookings.length === 0 && (
                        <div className="text-center py-8 text-gray-500">No bookings found</div>
                    )}
                </div>
            </div>
        </div>
    );
}
