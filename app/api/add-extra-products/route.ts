import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        const newProducts = [
            {
                name: "Elegant Earring Style 3",
                description: "Beautifully crafted earrings adding a touch of elegance to any outfit.",
                price: 499,
                category: "earrings",
                images: ["/earrings/earing3.jpg"], // Note: filename has one 'r'
                stock: 20,
                sizes: ["One Size"],
                shapes: [],
                isFeatured: false,
            },
            {
                name: "Hair Clip Style 18",
                description: "Stylish hair clip for a secure and fashionable hold.",
                price: 299,
                category: "hairclip",
                images: ["/hairclip/clip18.jpg"],
                stock: 20,
                sizes: ["One Size"],
                shapes: [],
                isFeatured: false,
            }
        ];

        const results = await Product.insertMany(newProducts);

        return NextResponse.json({
            success: true,
            message: `Successfully added ${results.length} new products`,
            products: results
        });

    } catch (error) {
        console.error('Error adding products:', error);
        return NextResponse.json({
            success: false,
            message: 'Error adding products',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
