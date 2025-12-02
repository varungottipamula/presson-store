import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        // Delete ALL nail products
        const result = await Product.deleteMany({ category: "nails" });

        return NextResponse.json({
            success: true,
            message: `Deleted all ${result.deletedCount} nail products. Run /api/seed-nails to re-add all 53 products.`,
            deletedCount: result.deletedCount
        });

    } catch (error) {
        console.error('Cleanup error:', error);
        return NextResponse.json({
            success: false,
            message: 'Error cleaning up nail products',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
