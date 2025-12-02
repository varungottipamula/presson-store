import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        const products = [];

        // Generate 4 hair rubber products
        for (let i = 1; i <= 4; i++) {
            const product = {
                name: `Colorful Hair Rubber Set ${i}`,
                description: "Durable and stretchy hair rubber bands. Perfect for creating ponytails and updos. Gentle on hair with no snag design.",
                price: 149, // Default price for hair rubbers
                originalPrice: 649,
                category: "hair-rubber",
                images: [`/hairrubber/rubber${i}.jpg`],
                stock: 60,
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
            message: `Successfully added ${result.length} hair rubber products`,
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
