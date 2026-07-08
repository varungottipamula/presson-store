'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Order {
    _id: string;
    user: {
        name: string;
        email: string;
        phone: string;
        address: string;
    };
    products: Array<{
        name: string;
        quantity: number;
        price: number;
        image?: string;
        size?: string;
        shape?: string;
        product?: {
            images?: string[];
        };
    }>;
    totalAmount: number;
    status: string;
    paymentInfo: {
        method: string;
        status: string;
    };
    deliveryConfirmationToken?: string;
    createdAt: string;
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await fetch('/api/admin/orders');
            const data = await res.json();
            if (data.success) {
                setOrders(data.orders);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateOrderStatus = async (orderId: string, status: string) => {
        try {
            const res = await fetch(`/api/admin/orders/${orderId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status }),
            });
            const data = await res.json();
            if (data.success) {
                if (data.deleted) {
                    // Order was delivered/cancelled and removed
                    alert(data.message || 'Order removed from the list!');
                }
                fetchOrders();
            }
        } catch (error) {
            console.error('Error updating order:', error);
        }
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-8">
                <p>Loading orders...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Orders Management</h1>
                <Link href="/admin" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                    Back to Dashboard
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Products</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Payment</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {orders.map((order) => (
                                <tr key={order._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order._id.slice(-8)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{order.user.name}</div>
                                        <div className="text-sm text-gray-500">{order.user.email}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-2 max-w-xs">
                                            {order.products.map((item, idx) => (
                                                <div key={idx} className="flex items-center gap-2">
                                                    {(() => {
                                                        const src = item.image || item.product?.images?.[0];
                                                        return src ? (
                                                            /* eslint-disable-next-line @next/next/no-img-element */
                                                            <img
                                                                src={src}
                                                                alt={item.name}
                                                                className="w-10 h-10 object-cover rounded border flex-shrink-0"
                                                            />
                                                        ) : (
                                                            <div className="w-10 h-10 bg-gray-100 rounded border flex items-center justify-center text-[10px] text-gray-400 flex-shrink-0">
                                                                No Img
                                                            </div>
                                                        );
                                                    })()}
                                                    <div className="text-xs">
                                                        <p className="font-semibold text-gray-900 line-clamp-1">{item.name}</p>
                                                        <div className="text-gray-500">
                                                            Qty: {item.quantity} | ₹{item.price}
                                                            {item.size ? ` | Sz: ${item.size}` : ''}
                                                            {item.shape ? ` | Sh: ${item.shape}` : ''}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">₹{order.totalAmount}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{order.paymentInfo?.method?.toUpperCase() || 'N/A'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select
                                            value={order.status}
                                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                            className="text-sm border rounded px-2 py-1"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm space-y-2">
                                        <button
                                            onClick={() => {
                                                const productList = order.products
                                                    .map(
                                                        (item) =>
                                                            `- ${item.name} (Qty: ${item.quantity}, Price: ₹${item.price}${item.size ? `, Size: ${item.size}` : ''}${item.shape ? `, Shape: ${item.shape}` : ''})`
                                                    )
                                                    .join('\n');
                                                alert(
                                                    `Order Details:\nOrder ID: ${order._id}\n\nCustomer Details:\nName: ${order.user.name}\nEmail: ${order.user.email}\nPhone: ${order.user.phone}\nAddress: ${order.user.address}\n\nProducts:\n${productList}\n\nSummary:\nTotal: ₹${order.totalAmount}\nStatus: ${order.status}`
                                                );
                                            }}
                                            className="text-blue-600 hover:text-blue-900 block"
                                        >
                                            View Details
                                        </button>
                                        {order.status === 'shipped' && order.deliveryConfirmationToken && (
                                            <button
                                                onClick={() => {
                                                    const link = `${window.location.origin}/confirm-delivery?token=${order.deliveryConfirmationToken}`;
                                                    navigator.clipboard.writeText(link);
                                                    alert('Confirmation link copied! Send this to the customer.');
                                                }}
                                                className="text-green-600 hover:text-green-900 block"
                                            >
                                                Copy Confirmation Link
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {orders.length === 0 && (
                        <div className="text-center py-8 text-gray-500">No orders found</div>
                    )}
                </div>
            </div>
        </div>
    );
}
