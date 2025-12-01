'use client';

import { IProduct } from '@/models/Product';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingBag } from 'lucide-react';

interface ProductGridProps {
  products: IProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const { addToCart } = useCart();

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center">
            <span className="text-5xl">📦</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No Products Found</h2>
          <p className="text-gray-600">
            Check back soon for new arrivals!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={(product._id as unknown) as string} className="group">
          <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
            <Link href={`/product/${product._id}`}>
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                {product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                {product.stock <= 0 && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                    Sold Out
                  </div>
                )}
              </div>
            </Link>
            <div className="p-5">
              <Link href={`/product/${product._id}`}>
                <p className="text-xs text-rose-500 font-semibold mb-1 uppercase tracking-wider text-center">
                  {product.category}
                </p>
                <h3 className="font-bold text-gray-900 mb-2 text-base line-clamp-2 text-center">
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center justify-between mt-3">
                <span className="text-xl font-black text-gray-900">₹{product.price}</span>
                <button
                  onClick={() => addToCart({
                    id: (product._id as unknown) as string,
                    name: product.name,
                    price: product.price,
                    image: product.images[0] || '',
                    quantity: 1,
                    size: product.sizes?.[0],
                    shape: product.shapes?.[0]
                  })}
                  className="p-2.5 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full hover:shadow-lg transition-all hover:scale-110"
                  aria-label="Add to cart"
                >
                  <ShoppingBag className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
