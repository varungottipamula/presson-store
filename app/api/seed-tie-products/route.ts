import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        const products = [];

        // Create products for tie1, tie2, tie3
        for (let i = 1; i <= 3; i++) {
            const product = {
                name: `Hair Tie Style ${i}`,
                description: "Stylish and comfortable hair tie, perfect for everyday wear. High-quality elastic for secure hold without damage.",
                price: 99,
                category: "hairclip",
                images: [`/hairclip/tie${i}.jpg`],
                stock: 30,
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
            message: `Successfully added ${result.length} hair tie products to hairclip category`,
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
