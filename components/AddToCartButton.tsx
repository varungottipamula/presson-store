'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Check } from 'lucide-react';

export default function AddToCartButton({ product }: { product: any }) {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart({
            id: product._id,
            name: product.name,
            price: product.price,
            image: product.images[0] || '',
            quantity: 1,
            size: selectedSize,
        });
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <div className="space-y-6">
            {/* Options */}
            {product.sizes && product.sizes.length > 0 && (
                <div className="space-y-2">
                    <label className="text-sm font-medium">Size</label>
                    <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="w-full p-2 border rounded-md bg-background"
                    >
                        {product.sizes.map((size: string) => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>
            )}

            <button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="w-full py-4 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
            >
                {isAdded ? (
                    <>
                        <Check className="h-6 w-6" /> Added to Cart
                    </>
                ) : (
                    <>
                        <ShoppingBag className="h-6 w-6" /> Add to Cart
                    </>
                )}
            </button>
        </div>
    );
}
