import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        const products = [];

        // Generate bag products 8 to 12
        for (let i = 8; i <= 12; i++) {
            const product = {
                name: `Premium Designer Bag Style ${i}`,
                description: "Elegant and spacious designer bag, perfect for any occasion. Crafted with high-quality materials for durability and style.",
                price: 999, // Default price for bags
                category: "bag",
                images: [`/bags/bag${i}.jpg`],
                stock: 20,
                sizes: ["One Size"],
                shapes: [],
                isFeatured: false,
            };
            products.push(product);
        }

        // Insert into database
        const result = await Product.insertMany(products);

        return NextResponse.json({
            success: true,
            message: `Successfully added ${result.length} additional bag products (8-12)`,
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
