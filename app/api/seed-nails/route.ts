import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import { nails } from '@/data/nails';

export async function GET() {
    try {
        await dbConnect();



        // Generate all 53 products from data file
        const products = nails.map(nail => ({
            name: nail.name,
            description: nail.description,
            price: nail.price,
            originalPrice: nail.originalPrice,
            category: nail.category,
            images: nail.images,
            stock: nail.stock,
            sizes: nail.sizes,
            shapes: nail.shapes,
            isFeatured: nail.isFeatured,
        }));

        // Insert into database
        // Use insertMany for bulk insertion
        // We'll first delete existing "nails" created by this script to avoid duplicates if run multiple times
        // But for safety, let's just append or maybe the user wants to clear old ones?
        // Let's just add them.

        const result = await Product.insertMany(products);

        return NextResponse.json({
            success: true,
            message: `Successfully added ${result.length} nail products`,
            products: result
        });

    } catch (error) {
        console.error('Seeding error:', error);
        return NextResponse.json({
            success: false,
            message: 'Error seeding products',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
