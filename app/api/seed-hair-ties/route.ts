import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        const products = [];

        // Generate 3 hair tie products
        for (let i = 1; i <= 3; i++) {
            const product = {
                name: `Stylish Hair Tie Set ${i}`,
                description: "Premium quality hair ties designed for comfort and style. Perfect for all hair types. Gentle on hair, no pulling or breakage.",
                price: 199, // Default price for hair ties
                category: "hair-tie",
                images: [`/hairtie/tie${i}.jpg`],
                stock: 50,
                sizes: ["One Size"],
                shapes: [],
                isFeatured: true,
            };
            products.push(product);
        }

        // Insert into database
        const result = await Product.insertMany(products);

        return NextResponse.json({
            success: true,
            message: `Successfully added ${result.length} hair tie products`,
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
