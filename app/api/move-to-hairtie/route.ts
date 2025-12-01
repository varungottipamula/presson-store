import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function POST() {
    try {
        await dbConnect();

        const updates = [
            {
                oldName: 'Knot headband set',
                newName: 'Knot headband set',
                description: 'A set of four knot-style headbands featuring floral prints, satin textures, and solid tones.'
            },
            {
                oldName: 'Large black bow clip',
                newName: 'Large black bow tie',
                description: 'A voluminous black sheer bow hair clip with subtle sparkles for an elegant look.'
            },
            {
                oldName: 'Velvet bow clips',
                newName: 'Velvet bow tie',
                description: 'Luxurious black velvet bow hair clips adorned with vintage-style gold cameo accents.'
            }
        ];

        const updatePromises = updates.map(async (update) => {
            return await Product.findOneAndUpdate(
                { name: update.oldName, category: 'hairclip' },
                {
                    name: update.newName,
                    description: update.description,
                    category: 'hairtie'
                },
                { new: true }
            );
        });

        const updatedProducts = await Promise.all(updatePromises);
        const successCount = updatedProducts.filter(p => p !== null).length;

        return NextResponse.json({
            success: true,
            message: `Successfully updated ${successCount} products to hairtie category`,
            updatedProducts: updatedProducts.filter(p => p !== null).map(p => ({
                id: p!._id,
                name: p!.name,
                category: p!.category
            }))
        });

    } catch (error) {
        console.error('Error updating to hairtie:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to update to hairtie',
                error: error instanceof Error ? error.message : 'Unknown error'
            },
            { status: 500 }
        );
    }
}
