import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Link from 'next/link';
import ProductImage from '@/components/ProductImage';

export const dynamic = 'force-dynamic';

interface ShopCategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

export default async function ShopCategoryPage({ params }: ShopCategoryPageProps) {
    const { category } = await params;
    const validCategories = [
        'nails', 'bag', 'watch', 'rubber', 'bracelet', 'rings',
        'necklace', 'earrings', 'glasses', 'phone-cover', 'hair-tie',
        'hair-rubber', 'hairclip', 'accessories', 'new-arrivals'
    ];

    if (!validCategories.includes(category)) {
        notFound();
    }

    await dbConnect();

    let products;
    const baseFilter = {
        price: { $gt: 0 },
        stock: { $gt: 0 },
        images: { $exists: true, $type: 'array', $ne: [], $elemMatch: { $ne: "" } }
    };

    if (category === 'new-arrivals') {
        products = await Product.find({ ...baseFilter } as any).sort({ createdAt: -1 }).limit(20);
    } else if (category === 'accessories') {
        products = await Product.find({ ...baseFilter, category: { $ne: 'nails' } } as any).sort({ createdAt: -1 });
    } else {
        products = await Product.find({ ...baseFilter, category } as any).sort({ createdAt: -1 });
    }

    // Serialize Mongoose documents to plain objects
    const serializedProducts = (products || []).map((doc) => {
        const product = doc.toObject() as any;
        product._id = product._id.toString();
        product.createdAt = product.createdAt.toISOString();
        product.updatedAt = product.updatedAt.toISOString();
        return product;
    });

    // Format category name for display
    const categoryName = category === 'nails' ? 'Press on Nails' : category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <div className="bg-gradient-to-br from-pink-50 via-white to-rose-50 py-16 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 font-[family-name:var(--font-playfair)] capitalize">
                        {categoryName}
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Browse our collection of {categoryName.toLowerCase()}
                    </p>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 py-12">
                {/* Special Offer Banner for Nails */}
                {category === 'nails' && (
                    <div className="mb-12 relative overflow-hidden rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 text-white shadow-xl">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="relative px-8 py-10 text-center md:px-12">
                            <div className="inline-block mb-4 rounded-full bg-white/20 px-4 py-1.5 text-sm font-bold backdrop-blur-sm">
                                ✨ Special Offer
                            </div>
                            <h2 className="mb-4 text-3xl font-black md:text-5xl font-[family-name:var(--font-playfair)]">
                                Buy 3 Get 1 FREE! 💅
                            </h2>
                            <p className="text-lg font-medium text-pink-100 md:text-xl">
                                Add any 4 nail sets to your cart and the cheapest one is on us!
                            </p>
                            <div className="mt-6 flex justify-center gap-2 text-sm font-medium text-pink-100">
                                <span className="flex items-center gap-1">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Automatic Discount
                                </span>
                                <span className="flex items-center gap-1">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Limited Time
                                </span>
                            </div>
                        </div>
                    </div>
                )}
                {serializedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                        {serializedProducts.map((product) => (
                            <Link
                                key={product._id}
                                href={`/product/${product._id}`}
                                className="group"
                            >
                                <div className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 border border-gray-100">
                                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
                                        <ProductImage
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {product.stock <= 0 && (
                                            <div className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                                                Sold Out
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-5 text-center">
                                        <p className="text-xs text-rose-500 font-semibold mb-1 uppercase tracking-wider">
                                            {product.category === 'nails' ? 'Press on Nails' : product.category}
                                        </p>
                                        <h3 className="font-bold text-gray-900 mb-2 text-base line-clamp-2">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center justify-center gap-2">
                                            <p className="text-xl font-black text-gray-900">
                                                ₹{(product.price || 0).toLocaleString()}
                                            </p>
                                            {product.originalPrice && product.price && product.originalPrice > product.price && (
                                                <>
                                                    <p className="text-sm text-gray-400 line-through">
                                                        ₹{(product.originalPrice || 0).toLocaleString()}
                                                    </p>
                                                    <span className="text-xs font-bold text-red-500">
                                                        -{Math.round((((product.originalPrice || 0) - (product.price || 0)) / (product.originalPrice || 1)) * 100)}%
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center">
                                <span className="text-5xl">📦</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Products Found</h2>
                            <p className="text-gray-600 mb-6">
                                We don't have any {categoryName.toLowerCase()} in stock right now. Check back soon!
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white rounded-full font-bold hover:shadow-lg transition-all"
                            >
                                Back to Home
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
