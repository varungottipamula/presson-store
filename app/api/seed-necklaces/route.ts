import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        const products = [];

        // Generate 6 necklace products
        for (let i = 1; i <= 6; i++) {
            const product = {
                name: `Elegant Necklace Style ${i}`,
                description: "Stunning necklace with exquisite craftsmanship. Perfect for adding a touch of elegance to any outfit. Adjustable chain length.",
                price: 899, // Default price for necklaces
                category: "necklace",
                images: [`/necklaces/necklace${i}.jpg`],
                stock: 20,
                sizes: ["One Size"],
                shapes: [],
                isFeatured: i <= 3,
            };
            products.push(product);
        }

        // Insert into database
        const result = await Product.insertMany(products);

        return NextResponse.json({
            success: true,
            message: `Successfully added ${result.length} necklace products`,
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
