import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        const products = [];

        // Generate 29 products
        for (let i = 1; i <= 29; i++) {
            const product = {
                name: `Elegant Press-on Nails Style ${i}`,
                description: "Handcrafted, premium quality press-on nails. Easy to apply, reusable, and designed for a salon-perfect look in minutes. Includes adhesive tabs and mini file.",
                price: 499, // Default price
                category: "nails",
                images: [`/nails/nail${i}.jpg`], // Path to the uploaded image
                stock: 50,
                sizes: ["XS", "S", "M", "L"],
                shapes: ["Almond", "Coffin", "Square", "Stiletto"],
                isFeatured: i <= 8, // Feature the first 8
            };
            products.push(product);
        }

        // Insert into database
        // Use insertMany for bulk insertion
        // We'll first delete existing "nails" created by this script to avoid duplicates if run multiple times
        // But for safety, let's just append or maybe the user wants to clear old ones?
        // Let's just add them.

        const result = await Product.insertMany(products);

        return NextResponse.json({
            success: true,
            message: `Successfully added ${result.length} nail products`,
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
