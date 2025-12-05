'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { CreditCard } from 'lucide-react';

declare global {
    interface Window {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Razorpay: any;
    }
}

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, cartTotal, clearCart } = useCart();
    const [paymentMethod, setPaymentMethod] = useState<'online'>('online');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
    });

    useEffect(() => {
        // Load Razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.state || !formData.pincode) {
            alert('Please fill in all fields');
            return false;
        }
        return true;
    };

    // Calculate Discount (Buy 3 Get 1 Free for Nails)
    const nailItems = cart.filter(item => item.category === 'nails');
    let discountAmount = 0;

    if (nailItems.length > 0) {
        // Expand items based on quantity
        const allNails = nailItems.flatMap(item => Array(item.quantity).fill(item.price));
        // Sort by price ascending
        allNails.sort((a, b) => a - b);

        // Every 4th item is free (the cheapest ones)
        const freeItemsCount = Math.floor(allNails.length / 4);
        for (let i = 0; i < freeItemsCount; i++) {
            discountAmount += allNails[i];
        }
    }

    const shippingCost = 99;
    const finalTotal = cartTotal - discountAmount + shippingCost;

    const handleOnlinePayment = async () => {
        if (!validateForm()) return;

        setLoading(true);

        try {
            // Create Razorpay order
            const orderRes = await fetch('/api/payment/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: finalTotal }),
            });

            const orderData = await orderRes.json();

            if (!orderData.success) {
                alert('Failed to create order');
                setLoading(false);
                return;
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxxxxxxxxxx',
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'Jerry Glam Store',
                description: 'Order Payment',
                order_id: orderData.orderId,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                handler: async function (response: any) {
                    try {
                        // Verify payment
                        const verifyRes = await fetch('/api/payment/verify', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                                orderData: {
                                    user: {
                                        name: formData.name,
                                        email: formData.email,
                                        phone: formData.phone,
                                        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
                                    },
                                    products: cart.map(item => ({
                                        product: item.id,
                                        name: item.name,
                                        quantity: item.quantity,
                                        price: item.price,
                                        size: item.size,
                                    })),
                                    totalAmount: finalTotal,
                                    discount: discountAmount,
                                    shipping: shippingCost
                                },
                            }),
                        });

                        const verifyData = await verifyRes.json();

                        if (verifyData.success) {
                            clearCart();
                            alert('Payment successful! Your order has been placed.');
                            router.push('/');
                        } else {
                            alert('Payment verification failed: ' + (verifyData.message || 'Unknown error'));
                        }
                    } catch (error) {
                        console.error('Payment verification error:', error);
                        alert('Payment verification failed. Please contact support with your payment details.');
                    }
                    setLoading(false);
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone,
                },
                theme: {
                    color: '#ec4899',
                },
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                modal: {
                    ondismiss: function () {
                        console.log('Payment modal closed by user');
                        setLoading(false);
                        alert('Payment cancelled. You can try again when ready.');
                    },
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onerror: function (error: any) {
                        console.error('Razorpay modal error:', error);
                        setLoading(false);
                        alert('Payment failed: ' + (error.description || error.reason || 'Unknown error'));
                    }
                }
            };

            console.log('🚀 Opening Razorpay with config:', {
                key: options.key,
                amount: options.amount,
                currency: options.currency,
                order_id: options.order_id,
            });

            const razorpay = new window.Razorpay(options);

            razorpay.on('payment.failed', function (response: { error: { code: string; description: string; reason: string; metadata: { order_id: string; payment_id: string } } }) {
                console.error('❌ Payment failed:', response.error);
                alert(`Payment failed: ${response.error.description}\nReason: ${response.error.reason}`);
                setLoading(false);
            });

            razorpay.open();
        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment failed. Please try again.');
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleOnlinePayment();
    };

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
                    <button
                        onClick={() => router.push('/')}
                        className="px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-3xl font-black text-gray-900 mb-8 font-[family-name:var(--font-playfair)]">
                    Checkout
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm p-6 space-y-6">
                            {/* Customer Details */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Address</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            rows={2}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all resize-none"
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Pincode *</label>
                                            <input
                                                type="text"
                                                name="pincode"
                                                value={formData.pincode}
                                                onChange={handleInputChange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Method</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div
                                        onClick={() => setPaymentMethod('online')}
                                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === 'online'
                                            ? 'border-pink-500 bg-pink-50'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'online' ? 'border-pink-500' : 'border-gray-300'
                                                }`}>
                                                {paymentMethod === 'online' && (
                                                    <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                                                )}
                                            </div>
                                            <CreditCard className="w-5 h-5 text-gray-700" />
                                            <div>
                                                <p className="font-bold text-gray-900">Online Payment</p>
                                                <p className="text-xs text-gray-600">Cards, UPI, Net Banking, Wallets</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Processing...' : 'Pay Now'}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                            <div className="space-y-3 mb-6">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-3">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                                            <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                                            {item.size && <p className="text-xs text-gray-600">Size: {item.size}</p>}
                                        </div>
                                        <p className="font-bold text-gray-900">₹{item.price * item.quantity}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-gray-200 pt-4 space-y-2">
                                <div className="flex justify-between text-gray-700">
                                    <span>Subtotal</span>
                                    <span>₹{cartTotal}</span>
                                </div>
                                {discountAmount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>Discount</span>
                                        <span>-₹{discountAmount}</span>
                                    </div>
                                )}
                                <div className="flex justify-between text-gray-700">
                                    <span>Shipping</span>
                                    <span className="text-gray-900 font-medium">₹{shippingCost}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                                    <span>Total</span>
                                    <span>₹{finalTotal}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
