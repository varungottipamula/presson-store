import { MetadataRoute } from 'next';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://jerrysglamstore.com';

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/shop`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/book`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/shipping`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];

    // Category pages
    const categories = [
        'nails',
        'bag',
        'watch',
        'bracelet',
        'rings',
        'necklace',
        'earrings',
        'glasses',
        'phone-cover',
        'hair-rubber',
        'hairclip',
        'accessories',
        'new-arrivals',
    ];

    const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
        url: `${baseUrl}/shop/${category}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.8,
    }));

    // Product pages - fetch all products from database
    let productPages: MetadataRoute.Sitemap = [];
    try {
        await dbConnect();
        const products = await Product.find(
            { stock: { $gt: 0 }, price: { $gt: 0 } },
            { _id: 1, updatedAt: 1 }
        ).lean();

        productPages = products.map((product) => ({
            url: `${baseUrl}/product/${product._id.toString()}`,
            lastModified: new Date(product.updatedAt || new Date()),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));
    } catch (error) {
        console.error('Error generating product sitemap entries:', error);
    }

    return [...staticPages, ...categoryPages, ...productPages];
}
