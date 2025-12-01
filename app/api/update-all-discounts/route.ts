import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        // Get all products
        const products = await Product.find({});
        let updatedCount = 0;

        for (const product of products) {
            // Set original price to be current price + 500
            // This ensures the "cut price" is always 500 more than the selling price
            const newOriginalPrice = product.price + 500;

            product.originalPrice = newOriginalPrice;
            await product.save();
            updatedCount++;
        }

        return NextResponse.json({
            success: true,
            message: `Updated ${updatedCount} products with discount pricing (originalPrice = price + 500)`,
            totalProducts: products.length
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
