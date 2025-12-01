import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        const products = [];

        // Generate 19 phone cover products
        for (let i = 1; i <= 19; i++) {
            const product = {
                name: `Stylish Phone Cover Design ${i}`,
                description: "Trendy phone cover with unique design. Provides excellent protection while adding style to your device. Compatible with multiple phone models.",
                price: 399, // Default price for phone covers
                category: "phone-cover",
                images: [`/phone covers/cover${i}.jpg`],
                stock: 40,
                sizes: ["Universal"],
                shapes: [],
                isFeatured: i <= 4,
            };
            products.push(product);
        }

        // Insert into database
        const result = await Product.insertMany(products);

        return NextResponse.json({
            success: true,
            message: `Successfully added ${result.length} phone cover products`,
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
