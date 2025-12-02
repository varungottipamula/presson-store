import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Link from 'next/link';
import ProductImage from '@/components/ProductImage';

export default async function AllProductsPage() {
    await dbConnect();
    const products = (await Product.find({}).sort({ createdAt: -1 })) || [];

    // Serialize Mongoose documents to plain objects
    const serializedProducts = products.map((doc) => {
        const product = doc.toObject() as any;
        product._id = product._id.toString();
        product.createdAt = product.createdAt.toISOString();
        product.updatedAt = product.updatedAt.toISOString();
        return product;
    });

    return (
        <div className="min-h-screen bg-white">
            {/* Header Section */}
            <div className="bg-gradient-to-br from-pink-50 via-white to-rose-50 py-16 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 text-gray-900 font-[family-name:var(--font-playfair)]">
                        All Products
                    </h1>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Explore our complete collection of premium press-on nails and accessories
                    </p>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 py-12">
                {serializedProducts.length > 0 ? (
                    <>
                        <div className="mb-6 text-center">
                            <p className="text-gray-600">
                                Showing <span className="font-semibold text-gray-900">{serializedProducts.length}</span> products
                            </p>
                        </div>

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
                                                {product.category}
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
                    </>
                ) : (
                    <div className="text-center py-20">
                        <div className="max-w-md mx-auto">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center">
                                <span className="text-5xl">📦</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-3">No Products Available</h2>
                            <p className="text-gray-600 mb-6">
                                We're currently updating our inventory. Check back soon!
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
