import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        const products = [];

        // Generate 19 watch products
        for (let i = 1; i <= 19; i++) {
            // Handle file extension for watch4
            const extension = i === 4 ? 'png' : 'jpg';

            const product = {
                name: `Luxury Timepiece Style ${i}`,
                description: "Elegant and precise quartz movement watch. Features a durable strap and water-resistant casing. A perfect blend of style and functionality.",
                price: 1499, // Default price for watches
                category: "watch",
                images: [`/watches/watch${i}.${extension}`],
                stock: 15,
                sizes: ["One Size"],
                shapes: [],
                isFeatured: i <= 4, // Feature the first 4
            };
            products.push(product);
        }

        // First, clear existing watches to avoid duplicates/confusion
        await Product.deleteMany({ category: 'watch' });

        // Insert into database
        const result = await Product.insertMany(products);

        return NextResponse.json({
            success: true,
            message: `Successfully added ${result.length} watch products`,
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
