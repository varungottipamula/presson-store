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

    // Use the provided src, or fallback to logo if error occurred or src is empty
    const imageSrc = error || !src ? '/logo.png' : src;

    // If it's a regular img tag (for external URLs without next/image config)
    // We use regular img tag to avoid "hostname not configured" errors for random URLs
    return (
        <img
            src={imageSrc}
            alt={alt}
            className={className}
            onError={() => setError(true)}
            loading="lazy"
        />
    );
}
