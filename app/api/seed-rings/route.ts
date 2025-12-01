import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        const products = [];

        // Generate 9 ring products
        for (let i = 1; i <= 9; i++) {
            const product = {
                name: `Stunning Ring Style ${i}`,
                description: "Exquisite ring with elegant design. Perfect for special occasions or everyday elegance. Available in adjustable sizes.",
                price: 599, // Default price for rings
                category: "rings",
                images: [`/rings/ring${i}.jpg`],
                stock: 30,
                sizes: ["Adjustable"],
                shapes: [],
                isFeatured: i <= 3,
            };
            products.push(product);
        }

        // Insert into database
        const result = await Product.insertMany(products);

        return NextResponse.json({
            success: true,
            message: `Successfully added ${result.length} ring products`,
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
