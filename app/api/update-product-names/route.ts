import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { nails } from '@/data/nails';

export async function GET() {
    try {
        await dbConnect();

        let updatedCount = 0;
        const errors = [];

        for (const nail of nails) {
            try {
                // Find product by image path since that's unique per product in our seed logic
                // We use the first image as the identifier
                const imagePath = nail.images[0];

                const result = await Product.updateOne(
                    {
                        category: 'nails',
                        images: imagePath
                    },
                    {
                        $set: {
                            name: nail.name,
                            description: nail.description
                        }
                    }
                );

                if (result.modifiedCount > 0) {
                    updatedCount++;
                }
            } catch (err) {
                console.error(`Error updating product ${nail.name}:`, err);
                errors.push({ name: nail.name, error: err instanceof Error ? err.message : 'Unknown error' });
            }
        }

        return NextResponse.json({
            success: true,
            message: `Updated ${updatedCount} products`,
            totalProcessed: nails.length,
            errors: errors.length > 0 ? errors : undefined
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
