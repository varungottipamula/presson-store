import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        const products = [];

        // Generate 13 earring products
        for (let i = 1; i <= 13; i++) {
            const product = {
                name: `Beautiful Earrings Style ${i}`,
                description: "Gorgeous earrings with stunning design. Perfect for adding sparkle to any look. Lightweight and comfortable for all-day wear.",
                price: 699, // Default price for earrings
                originalPrice: 1199,
                category: "earrings",
                images: [`/earrings/earing${i}.jpg`],
                stock: 25,
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
            message: `Successfully added ${result.length} earring products`,
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
