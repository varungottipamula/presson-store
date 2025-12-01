import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function POST() {
    try {
        await dbConnect();

        const glassesUpdates = [
            {
                name: '3-piece cat-eye set',
                description: 'A trio of sleek cat-eye sunglasses in black, pink, and brown transparent frames.'
            },
            {
                name: 'Mini cat-eye shades',
                description: 'Chic narrow cat-eye sunglasses with gold temples and dark lenses.'
            },
            {
                name: 'Slim oval sunglasses',
                description: 'Stylish slim oval frames in glossy black and brown tones.'
            },
            {
                name: 'Retro metal shades',
                description: 'Minimal metal-frame sunglasses with slim dark lenses, perfect for a vintage look.'
            },
            {
                name: 'Bold black cat-eye',
                description: 'Sharp black cat-eye sunglasses with a glossy finish and modern edge.'
            },
            {
                name: 'Luxury square shades',
                description: 'High-fashion black rectangular sunglasses with bold gold detailing on the temples.'
            }
        ];

        // Get all glasses products sorted by creation date (oldest first)
        const glasses = await Product.find({ category: 'glasses' }).sort({ createdAt: 1 });

        if (glasses.length < glassesUpdates.length) {
            return NextResponse.json({
                success: false,
                message: `Only found ${glasses.length} glasses products, but need ${glassesUpdates.length}`
            }, { status: 400 });
        }

        const updatePromises = glasses.slice(0, glassesUpdates.length).map((glass, index) => {
            return Product.findByIdAndUpdate(
                glass._id,
                {
                    name: glassesUpdates[index].name,
                    description: glassesUpdates[index].description
                },
                { new: true }
            );
        });

        const updatedGlasses = await Promise.all(updatePromises);

        return NextResponse.json({
            success: true,
            message: `Successfully updated ${updatedGlasses.length} glasses products`,
            updatedProducts: updatedGlasses.map(g => ({ id: g._id, name: g.name }))
        });

    } catch (error) {
        console.error('Error updating glasses:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to update glasses',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
