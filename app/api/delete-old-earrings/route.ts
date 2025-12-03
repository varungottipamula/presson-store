import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function DELETE() {
    try {
        await dbConnect();

        // Delete the 2 old earring products by name
        const result = await Product.deleteMany({
            category: 'earrings',
            name: {
                $in: ['Crystal floral drop earrings', 'Pearl rose earrings']
            }
        });

        return NextResponse.json({
            success: true,
            message: `Successfully deleted ${result.deletedCount} old earring products`,
            deletedCount: result.deletedCount
        });

    } catch (error) {
        console.error('Delete error:', error);
        return NextResponse.json({
            success: false,
            message: 'Error deleting products',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
