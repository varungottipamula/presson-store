'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ProductImageProps {
    src: string;
    alt: string;
    className?: string;
    fill?: boolean;
    width?: number;
    height?: number;
}

export default function ProductImage({ src, alt, className, fill, width, height }: ProductImageProps) {
    const [error, setError] = useState(false);

    // If error or no src, show a placeholder
    if (error || !src) {
        return (
            <div className={`${className} bg-gray-100 flex items-center justify-center`}>
                <div className="text-gray-400 text-sm">No Image</div>
            </div>
        );
    }

    // Use regular img tag to avoid "hostname not configured" errors for external URLs
    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setError(true)}
            loading="lazy"
        />
    );
}
