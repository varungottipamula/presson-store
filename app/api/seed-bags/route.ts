import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        const products = [];

        // Generate 7 bag products
        for (let i = 1; i <= 7; i++) {
            const product = {
                name: `Premium Designer Bag Style ${i}`,
                description: "Elegant and spacious designer bag, perfect for any occasion. Crafted with high-quality materials for durability and style.",
                price: 999, // Default price for bags
                category: "bag", // Matches the slug in page.tsx
                images: [`/bags/bag${i}.jpg`], // Path to the uploaded image
                stock: 20,
                sizes: ["One Size"],
                shapes: [], // Bags don't have shapes usually
                isFeatured: i <= 4, // Feature the first 4
            };
            products.push(product);
        }

        // Insert into database
        const result = await Product.insertMany(products);

        return NextResponse.json({
            success: true,
            message: `Successfully added ${result.length} bag products`,
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
