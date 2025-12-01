import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        const bagUpdates = [
            {
                image: '/bags/bag13.jpg',
                name: 'Brown Shoulder Tote Bag',
                description: 'A large, soft brown leather shoulder tote perfect for everyday use.'
            },
            {
                image: '/bags/bag14.jpg',
                name: 'Cream Crystal-Buckle Shoulder Bag',
                description: 'Elegant cream shoulder bag featuring a sparkling crystal buckle detail.'
            },
            {
                image: '/bags/bag15.jpg',
                name: 'Light Blue Crystal-Buckle Bag',
                description: 'Stylish pastel blue shoulder bag with a decorative crystal buckle.'
            },
            {
                image: '/bags/bag16.jpg',
                name: 'Black Crystal-Buckle Shoulder Bag',
                description: 'Chic black mini shoulder bag enhanced with a shimmering crystal buckle.'
            },
            {
                image: '/bags/bag17.jpg',
                name: 'Beige Crystal-Buckle Bag',
                description: 'Neutral beige shoulder bag featuring a classy crystal buckle accent.'
            },
            {
                image: '/bags/bag18.jpg',
                name: 'Brown Structured Shoulder Bag',
                description: 'A minimal brown structured shoulder bag with a sleek, modern design.'
            },
            {
                image: '/bags/bag19.jpg',
                name: 'White Padded Chain Bag',
                description: 'Trendy white padded bag with a gold chain strap for a stylish look.'
            },
            {
                image: '/bags/bag20.jpg',
                name: 'Black Structured Shoulder Bag',
                description: 'Simple and elegant black shoulder bag with a clean, structured shape.'
            },
            {
                image: '/bags/bag21.jpg',
                name: 'Black Padded Chain Bag',
                description: 'Modern black padded bag paired with a chunky gold chain strap.'
            },
            {
                image: '/bags/bag22.jpg',
                name: 'Brown Padded Chain Bag',
                description: 'Fashionable brown padded shoulder bag accented with a gold chain.'
            },
            {
                image: '/bags/bag23.jpg',
                name: 'Green Bag',
                description: 'Bright green ruched handle bag with a soft, puffy leather design.'
            },
            {
                image: '/bags/bag24.jpg',
                name: 'Black Bag',
                description: 'Chic black ruched handle bag featuring a glossy, smooth leather look.'
            },
            {
                image: '/bags/bag26.jpg',
                name: 'Red Bag',
                description: 'Bold red puffy ruched handbag with a modern rounded silhouette.'
            },
            {
                image: '/bags/bag27.jpg',
                name: 'White Bag',
                description: 'Elegant white ruched handle bag with a soft, gathered leather style.'
            }
        ];

        const results = [];

        for (const update of bagUpdates) {
            const result = await Product.findOneAndUpdate(
                { images: update.image, category: 'bag' },
                {
                    name: update.name,
                    description: update.description
                },
                { new: true }
            );

            if (result) {
                results.push({ success: true, bag: update.image, name: update.name });
            } else {
                results.push({ success: false, bag: update.image, error: 'Not found' });
            }
        }

        return NextResponse.json({
            success: true,
            message: `Updated ${results.filter(r => r.success).length} bag products`,
            results
        });

    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({
            success: false,
            message: 'Error updating products',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
