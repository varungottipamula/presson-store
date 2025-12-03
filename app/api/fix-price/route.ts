import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        const product = await Product.findOneAndUpdate(
            { name: "Soft Blue Floral Pattern Nails" },
            {
                price: 700,
                originalPrice: 1200
            },
            { new: true }
        );

        if (!product) {
            return NextResponse.json({
                success: false,
                message: 'Product not found'
            }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Successfully updated product price',
            product
        });

    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json({
            success: false,
            message: 'Error updating product',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
