import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import AddToCartButton from '../../../components/AddToCartButton';
import ProductImage from '@/components/ProductImage';
import StructuredData from '@/components/StructuredData';

interface ProductPageProps {
    params: Promise<{
        id: string;
    }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
    const { id } = await params;

    try {
        await dbConnect();
        const product = await Product.findById(id);

        if (!product) {
            return {
                title: 'Product Not Found',
            };
        }

        const categoryName = product.category === 'nails' ? 'Press on Nails' : product.category;

        return {
            title: product.name,
            description: product.description || `Buy ${product.name} at Jerry Glam Store. Premium quality ${categoryName} available for ₹${product.price}.`,
            openGraph: {
                title: product.name,
                description: product.description || `Buy ${product.name} at Jerry Glam Store`,
                images: product.images?.[0] ? [{ url: product.images[0], width: 1200, height: 630, alt: product.name }] : [],
                type: 'website',
            },
            twitter: {
                card: 'summary_large_image',
                title: product.name,
                description: product.description || `Buy ${product.name} at Jerry Glam Store`,
                images: product.images?.[0] ? [product.images[0]] : [],
            },
        };
    } catch (error) {
        return {
            title: 'Product Not Found',
        };
    }
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params;

    await dbConnect();
    let product;
    try {
        product = await Product.findById(id);
    } catch (e) {
        notFound();
    }

    if (!product) {
        notFound();
    }

    // Serialize
    const serializedProduct = {
        ...(product.toObject() as any),
        _id: product._id.toString(),
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt.toISOString(),
    };

    return (
        <>
            <StructuredData type="product" data={serializedProduct} />
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                            {serializedProduct.images && serializedProduct.images[0] ? (
                                <ProductImage
                                    src={serializedProduct.images[0]}
                                    alt={serializedProduct.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                            )}
                        </div>
                        <div className="grid grid-cols-4 gap-4">
                            {(serializedProduct.images || []).slice(1).map((img: string, idx: number) => (
                                <div key={idx} className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                                    <ProductImage src={img} alt={`${serializedProduct.name} ${idx + 2}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold mb-2">{serializedProduct.name}</h1>
                            <div className="flex items-end gap-3 mb-2">
                                <p className="text-3xl font-black text-primary">₹{(serializedProduct.price || 0).toLocaleString()}</p>
                                {serializedProduct.originalPrice && serializedProduct.price && serializedProduct.originalPrice > serializedProduct.price && (
                                    <div className="flex items-end gap-2 mb-1">
                                        <p className="text-xl text-gray-400 line-through">
                                            ₹{(serializedProduct.originalPrice || 0).toLocaleString()}
                                        </p>
                                        <span className="text-lg font-bold text-red-500">
                                            -{Math.round((((serializedProduct.originalPrice || 0) - (serializedProduct.price || 0)) / (serializedProduct.originalPrice || 1)) * 100)}%
                                        </span>
                                    </div>
                                )}
                            </div>
                            {serializedProduct.originalPrice && serializedProduct.price && serializedProduct.originalPrice > serializedProduct.price && (
                                <p className="text-sm text-green-600 font-medium">
                                    You Save: ₹{((serializedProduct.originalPrice || 0) - (serializedProduct.price || 0)).toLocaleString()}
                                </p>
                            )}
                        </div>

                        <div className="prose prose-sm text-muted-foreground">
                            <p>{serializedProduct.description}</p>
                        </div>

                        <AddToCartButton product={serializedProduct} />

                        <div className="border-t pt-6 space-y-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">Category:</span>
                                <span className="capitalize">{serializedProduct.category}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">Availability:</span>
                                {serializedProduct.stock > 0 ? (
                                    <span className="text-green-600">In Stock ({serializedProduct.stock})</span>
                                ) : (
                                    <span className="text-red-600">Out of Stock</span>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">Delivery:</span>
                                <span>7 to 14 days</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
