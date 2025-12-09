'use client';

import './globals.css';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body>
                <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
                    <div className="text-center space-y-6 max-w-md">
                        <h2 className="text-3xl font-bold text-gray-900">Something went wrong!</h2>
                        <p className="text-gray-600">
                            A critical error occurred. We apologize for the inconvenience.
                        </p>
                        <div className="p-4 bg-red-50 border border-red-100 rounded-lg text-left overflow-auto max-h-48">
                            <p className="text-sm text-red-800 font-mono">{error.message}</p>
                        </div>
                        <button
                            onClick={() => reset()}
                            className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}
