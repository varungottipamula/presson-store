'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

function ConfirmDeliveryContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const token = searchParams.get('token');

        if (!token) {
            setStatus('error');
            setMessage('Invalid confirmation link. Please check the URL.');
            return;
        }

        confirmDelivery(token);
    }, [searchParams]);

    const confirmDelivery = async (token: string) => {
        try {
            const res = await fetch('/api/orders/confirm-delivery', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
            });

            const data = await res.json();

            if (data.success) {
                setStatus('success');
                setMessage('Thank you! Your delivery has been confirmed.');
                setTimeout(() => router.push('/'), 3000);
            } else {
                setStatus('error');
                setMessage(data.message || 'Failed to confirm delivery.');
            }
        } catch (error) {
            console.error('Confirmation error:', error);
            setStatus('error');
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
                {status === 'loading' && (
                    <>
                        <Loader2 className="h-16 w-16 text-pink-500 mx-auto mb-4 animate-spin" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Confirming Delivery...
                        </h1>
                        <p className="text-gray-600">Please wait while we process your confirmation.</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Delivery Confirmed!
                        </h1>
                        <p className="text-gray-600 mb-4">{message}</p>
                        <p className="text-sm text-gray-500">Redirecting to home page...</p>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Confirmation Failed
                        </h1>
                        <p className="text-gray-600 mb-6">{message}</p>
                        <button
                            onClick={() => router.push('/')}
                            className="px-6 py-3 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
                        >
                            Return to Home
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default function ConfirmDeliveryPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="h-10 w-10 text-pink-500 animate-spin" />
            </div>
        }>
            <ConfirmDeliveryContent />
        </Suspense>
    );
}
