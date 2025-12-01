import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        // Count all bag products
        const totalBags = await Product.countDocuments({ category: 'bag' });

        // Get all bag products
        const allBags = await Product.find({ category: 'bag' }).sort({ createdAt: -1 });

        // Get bag names
        const bagNames = allBags.map(b => ({
            name: b.name,
            image: b.images[0],
            createdAt: b.createdAt
        }));

        return NextResponse.json({
            success: true,
            totalBags,
            bagNames
        });

    } catch (error) {
        console.error('Error checking bags:', error);
        return NextResponse.json({
            success: false,
            error: String(error)
        }, { status: 500 });
    }
}
