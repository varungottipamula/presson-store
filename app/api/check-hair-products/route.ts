import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await dbConnect();

        // Check hair-tie products
        const hairTieProducts = await Product.find({ category: 'hair-tie' });

        // Check hairclip products
        const hairclipProducts = await Product.find({ category: 'hairclip' });

        return NextResponse.json({
            success: true,
            hairTieCount: hairTieProducts.length,
            hairTieProducts: hairTieProducts.map(p => ({ name: p.name, image: p.images[0], category: p.category })),
            hairclipCount: hairclipProducts.length,
            hairclipProducts: hairclipProducts.map(p => ({ name: p.name, image: p.images[0], category: p.category }))
        });

    } catch (error) {
        console.error('Check error:', error);
        return NextResponse.json({
            success: false,
            error: String(error)
        }, { status: 500 });
    }
}
