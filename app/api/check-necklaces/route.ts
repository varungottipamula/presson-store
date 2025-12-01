import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        const necklaces = await Product.find({ category: 'necklace' }).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            count: necklaces.length,
            necklaces: necklaces.map(n => ({
                name: n.name,
                image: n.images[0],
                price: n.price,
                description: n.description
            }))
        });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({
            success: false,
            error: String(error)
        }, { status: 500 });
    }
}
