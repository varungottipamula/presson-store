import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function POST() {
    try {
        await dbConnect();

        const necklaceUpdates = [
            {
                name: 'Silver rhinestone bracelet necklace',
                description: 'A sparkling adjustable chain necklace with a thick row of glittering rhinestones.'
            },
            {
                name: 'Pink teardrop pendant necklace',
                description: 'A delicate silver necklace featuring a pink teardrop crystal charm and floral crystal detailing.'
            },
            {
                name: 'Layered pearl necklace',
                description: 'A classic multi-layer pearl necklace with elegant, glossy round pearls.'
            },
            {
                name: 'Green gemstone pendant necklace',
                description: 'A sleek gold necklace with a rectangular emerald-green stone pendant.'
            },
            {
                name: 'Gold chain with green pendant',
                description: 'A simple gold chain necklace showcasing a bold emerald-green rectangular charm.'
            },
            {
                name: 'Pearl bow necklace',
                description: 'A cute pearl strand necklace accented with a small pearl-studded bow pendant.'
            }
        ];

        // Get all necklace products sorted by creation date (oldest first)
        const necklaces = await Product.find({ category: 'necklace' }).sort({ createdAt: 1 });

        if (necklaces.length < necklaceUpdates.length) {
            return NextResponse.json({
                success: false,
                message: `Only found ${necklaces.length} necklace products, but need ${necklaceUpdates.length}`
            }, { status: 400 });
        }

        const updatePromises = necklaces.slice(0, necklaceUpdates.length).map((necklace, index) => {
            return Product.findByIdAndUpdate(
                necklace._id,
                {
                    name: necklaceUpdates[index].name,
                    description: necklaceUpdates[index].description
                },
                { new: true }
            );
        });

        const updatedNecklaces = await Promise.all(updatePromises);

        const validNecklaces = updatedNecklaces.filter((n): n is NonNullable<typeof n> => n !== null);

        return NextResponse.json({
            success: true,
            message: `Successfully updated ${validNecklaces.length} necklace products`,
            updatedProducts: validNecklaces.map(n => ({ id: n._id, name: n.name }))
        });

    } catch (error) {
        console.error('Error updating necklaces:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to update necklaces',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
