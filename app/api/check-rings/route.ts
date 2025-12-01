import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        const rings = await Product.find({ category: 'rings' }).sort({ createdAt: -1 });

        return NextResponse.json({
            success: true,
            count: rings.length,
            rings: rings.map(r => ({
                name: r.name,
                image: r.images[0],
                price: r.price,
                description: r.description
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
