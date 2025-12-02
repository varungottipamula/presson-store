import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        const products = [];

        // Generate bracelet products (note: braclet8 is missing, so we skip it)
        const braceletIds = [1, 2, 3, 4, 5, 6, 7, 9];

        for (const i of braceletIds) {
            const product = {
                name: `Elegant Bracelet Style ${i}`,
                description: "Beautifully crafted bracelet with intricate design. Perfect accessory to complement any outfit. Adjustable fit for comfort.",
                price: 799, // Default price for bracelets
                originalPrice: 1299,
                category: "bracelet",
                images: [`/braclets/braclet${i}.jpg`],
                stock: 25,
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
            message: `Successfully added ${result.length} bracelet products`,
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
