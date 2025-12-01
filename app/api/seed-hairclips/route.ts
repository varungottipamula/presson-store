import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        // Clear existing hairclip products to avoid duplicates if run multiple times
        // await Product.deleteMany({ category: 'hairclip' }); 

        const products = [];
        const adjectives = ['Elegant', 'Sparkling', 'Vintage', 'Modern', 'Chic', 'Minimalist', 'Floral', 'Pearl', 'Gold-Tone', 'Silver-Tone', 'Crystal', 'Matte', 'Glossy', 'Velvet', 'Satin', 'Bow'];
        const types = ['Hair Clip', 'Barrette', 'Claw Clip', 'Snap Clip', 'Bobby Pin Set', 'Alligator Clip'];

        // Generate 16 hair clip products
        for (let i = 1; i <= 16; i++) {
            // Pick random name components
            const adj = adjectives[(i - 1) % adjectives.length];
            const type = types[(i - 1) % types.length];

            const product = {
                name: `${adj} ${type} Design ${i}`,
                description: `Elevate your hairstyle with our ${adj} ${type}. Perfect for daily wear or special occasions. This high-quality hair accessory ensures a secure hold while adding a touch of glamour to your look. Durable, stylish, and gentle on your hair.`,
                price: Math.floor(Math.random() * (499 - 149 + 1)) + 149, // Random price between 149 and 499
                category: "hairclip",
                images: [`/hairclip/clip${i}.jpg`],
                stock: 50,
                sizes: ["One Size"],
                shapes: [],
                isFeatured: i <= 4, // Feature the first 4
            };
            products.push(product);
        }

        // Insert into database
        const result = await Product.insertMany(products);

        return NextResponse.json({
            success: true,
            message: `Successfully added ${result.length} hair clip products`,
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
