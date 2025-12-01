import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        // Get all hairclip products
        const products = await Product.find({ category: 'hairclip' }).sort({ name: 1 });

        // Create a summary of images used
        const imageSummary = products.map(p => ({
            id: p._id,
            name: p.name,
            images: p.images
        }));

        return NextResponse.json({
            success: true,
            count: products.length,
            products: imageSummary
        });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            success: false,
            message: 'Error fetching products',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
