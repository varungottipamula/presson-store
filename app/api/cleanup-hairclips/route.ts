import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        // Delete all hairclip products first
        const deleteResult = await Product.deleteMany({ category: 'hairclip' });

        // Now re-seed with unique products
        const products = [];
        const adjectives = ['Elegant', 'Sparkling', 'Vintage', 'Modern', 'Chic', 'Minimalist', 'Floral', 'Pearl', 'Gold-Tone', 'Silver-Tone', 'Crystal', 'Matte', 'Glossy', 'Velvet', 'Satin', 'Bow'];
        const types = ['Hair Clip', 'Barrette', 'Claw Clip', 'Snap Clip', 'Bobby Pin Set', 'Alligator Clip'];

        // Generate 16 unique hair clip products
        for (let i = 1; i <= 16; i++) {
            const adj = adjectives[(i - 1) % adjectives.length];
            const type = types[(i - 1) % types.length];

            const product = {
                name: `${adj} ${type} Design ${i}`,
                description: `Elevate your hairstyle with our ${adj} ${type}. Perfect for daily wear or special occasions. This high-quality hair accessory ensures a secure hold while adding a touch of glamour to your look. Durable, stylish, and gentle on your hair.`,
                price: Math.floor(Math.random() * (499 - 149 + 1)) + 149,
                category: "hairclip",
                images: [`/hairclip/clip${i}.jpg`],
                stock: 50,
                sizes: ["One Size"],
                shapes: [],
                isFeatured: i <= 4,
            };
            products.push(product);
        }

        // Insert into database
        const result = await Product.insertMany(products);

        return NextResponse.json({
            success: true,
            message: `Deleted ${deleteResult.deletedCount} duplicate products and added ${result.length} unique hair clip products`,
            deletedCount: deleteResult.deletedCount,
            addedCount: result.length
        });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            success: false,
            message: 'Error cleaning up products',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}
