import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        const products = [];

        // Generate 6 glasses products
        for (let i = 1; i <= 6; i++) {
            const product = {
                name: `Trendy Glasses Style ${i}`,
                description: "Fashionable eyewear with UV protection. Perfect blend of style and functionality. Lightweight frame for comfortable all-day wear.",
                price: 1299, // Default price for glasses
                category: "glasses",
                images: [`/glasses/glass${i}.jpg`],
                stock: 15,
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
            message: `Successfully added ${result.length} glasses products`,
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
