import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        // Update all hair-tie products to hairclip
        const result = await Product.updateMany(
            { category: 'hair-tie' },
            { $set: { category: 'hairclip' } }
        );

        return NextResponse.json({
            success: true,
            message: `Successfully moved ${result.modifiedCount} products from hair-tie to hairclip`,
            modifiedCount: result.modifiedCount
        });

    } catch (error) {
        console.error('Migration error:', error);
        return NextResponse.json({
            success: false,
            message: 'Error migrating products',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
